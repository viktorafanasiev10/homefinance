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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const models_1 = require("../models");
class UserController {
    // Get all users
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Get a user by id
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield models_1.User.findByPk(id);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ error: 'User with the specified ID does not exists' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Update a user
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const [updated] = yield models_1.User.update(req.body, {
                    where: { id: id }
                });
                if (updated) {
                    const updatedUser = yield models_1.User.findByPk(id);
                    res.status(200).json({ user: updatedUser });
                }
                else {
                    res.status(404).json({ error: 'User with the specified ID not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Delete a user
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deleted = yield models_1.User.destroy({
                    where: { id: id }
                });
                if (deleted) {
                    res.status(200).send("User deleted");
                }
                else {
                    res.status(404).send("User not found");
                }
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.userController = new UserController();
