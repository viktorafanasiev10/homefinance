"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const transaction_controller_js_1 = require("../controllers/transaction.controller.js");
const router = (0, express_1.Router)();
exports.transactionRouter = router;
router.get('/', transaction_controller_js_1.transactionController.getAll);
router.post('/transfer', transaction_controller_js_1.transactionController.createTransfer);
router.post('/income/:accountId', transaction_controller_js_1.transactionController.createIncome);
router.post('/expense/:accountId', transaction_controller_js_1.transactionController.createExpense);
router.post('/:accountId', transaction_controller_js_1.transactionController.create);
router.put('/:accountId/:transactionId', transaction_controller_js_1.transactionController.update);
router.delete('/:accountId/:transactionId', transaction_controller_js_1.transactionController.delete);
