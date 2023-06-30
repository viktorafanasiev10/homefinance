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
exports.transactionController = void 0;
const database_js_1 = require("../config/database.js");
const models_1 = require("../models");
class TransactionController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const accountId = req.params.accountId;
            try {
                const transactions = yield models_1.Transaction.findAll({ where: { accountId, userId } });
                res.json(transactions);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while fetching transactions' });
            }
        });
    }
    createTransfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { fromAccountId, toAccountId, amount, date, description, exchangeRate, foreignCurrencyAmount } = req.body;
            const transaction = yield database_js_1.sequelize.transaction();
            try {
                const fromTransaction = yield models_1.Transaction.create({ accountId: fromAccountId, userId, subcategoryId: null, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Transfer' }, { transaction });
                const toTransaction = yield models_1.Transaction.create({ accountId: toAccountId, userId, subcategoryId: null, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Transfer' }, { transaction });
                yield transaction.commit();
                res.json({ fromTransaction, toTransaction });
            }
            catch (err) {
                yield transaction.rollback();
                res.status(500).json({ message: 'Error while creating transaction' });
            }
        });
    }
    createIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const accountId = req.params.accountId;
            const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount } = req.body;
            const transaction = yield database_js_1.sequelize.transaction();
            try {
                const account = yield models_1.Account.findOne({ where: { id: accountId, userId } });
                if (!account) {
                    yield transaction.rollback();
                    return res.status(404).json({ message: 'Account not found' });
                }
                account.currentBalance += amount;
                yield account.save({ transaction });
                const newTransaction = yield models_1.Transaction.create({ accountId, userId, subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Income' }, { transaction });
                yield transaction.commit();
                res.json(newTransaction);
            }
            catch (err) {
                yield transaction.rollback();
                res.status(500).json({ message: 'Error while creating transaction' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const accountId = req.params.accountId;
            const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type } = req.body;
            try {
                const transaction = yield models_1.Transaction.create({ accountId, userId, subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type });
                res.json(transaction);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while creating transaction' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const accountId = req.params.accountId;
            const { transactionId } = req.params;
            const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type } = req.body;
            try {
                const transaction = yield models_1.Transaction.findOne({ where: { id: transactionId, accountId, userId } });
                if (!transaction) {
                    return res.status(404).json({ message: 'Transaction not found' });
                }
                transaction.subcategoryId = subcategoryId;
                transaction.amount = amount;
                transaction.date = date;
                transaction.description = description;
                transaction.exchangeRate = exchangeRate;
                transaction.foreignCurrencyAmount = foreignCurrencyAmount;
                transaction.type = type;
                yield transaction.save();
                res.json(transaction);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while updating transaction' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const accountId = req.params.accountId;
            const { transactionId } = req.params;
            try {
                const transaction = yield models_1.Transaction.findOne({ where: { id: transactionId, accountId, userId } });
                if (!transaction) {
                    return res.status(404).json({ message: 'Transaction not found' });
                }
                yield transaction.destroy();
                res.json({ message: 'Transaction deleted' });
            }
            catch (err) {
                res.status(500).json({ message: 'Error while deleting transaction' });
            }
        });
    }
}
exports.transactionController = new TransactionController();
