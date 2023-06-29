"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                const user = yield models_1.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                });
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    login(req, res, next) {
        passport_1.default.authenticate('local', (err, user) => {
            if (err)
                throw err;
            if (!user)
                res.status(400).send("No User Exists");
            else {
                // req.logIn(user, (err: any) => {
                //   if (err) throw err;
                //   res.status(200).send("Successfully Authenticated");
                // });
                const payload = {
                    id: user.id,
                    username: user.username
                };
                const secret = process.env.JWT_SECRET || 'your-secret-key'; // It's better to store secrets in environment variables
                const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
                res.json({ token });
            }
        })(req, res, next);
    }
}
exports.authController = new AuthController();
