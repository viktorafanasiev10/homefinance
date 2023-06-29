"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.user = payload; // Add user info to request
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};
exports.isAuthenticated = isAuthenticated;
