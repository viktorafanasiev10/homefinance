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
exports.accountController = void 0;
const models_1 = require("../models/");
class AccountController {
    // Get all accounts for a user
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id; // Assuming you have user info in req.user
            try {
                const accounts = yield models_1.Account.findAll({ where: { userId } });
                res.json(accounts);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while fetching accounts' });
            }
        });
    }
    // Create a new account
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id; // Assuming you have user info in req.user
            const { name, initialBalance, currentBalance, currency } = req.body;
            try {
                const account = yield models_1.Account.create({ userId, name, initialBalance, currentBalance, currency });
                res.json(account);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while creating account' });
            }
        });
    }
    // Update an account
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id; // Assuming you have user info in req.user
            const { id } = req.params;
            const { name, initialBalance, currentBalance, currency } = req.body;
            try {
                const account = yield models_1.Account.findOne({ where: { id, userId } });
                if (!account) {
                    return res.status(404).json({ message: 'Account not found' });
                }
                account.name = name;
                account.initialBalance = initialBalance;
                account.currentBalance = currentBalance;
                account.currency = currency;
                yield account.save();
                res.json(account);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while updating account' });
            }
        });
    }
    // Delete an account
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id; // Assuming you have user info in req.user
            const { accountId } = req.params;
            try {
                const account = yield models_1.Account.findOne({ where: { id: accountId, userId } });
                if (!account) {
                    return res.status(404).json({ message: 'Account not found' });
                }
                yield account.destroy();
                res.json({ message: 'Account deleted' });
            }
            catch (err) {
                res.status(500).json({ message: 'Error while deleting account' });
            }
        });
    }
}
exports.accountController = new AccountController();
