import { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller.js';

const router = Router();

router.get('/', transactionController.getAll);
router.post('/transfer', transactionController.createTransfer);
router.post('/income/:accountId', transactionController.createIncome);
router.post('/:accountId', transactionController.create);
router.put('/:accountId/:transactionId', transactionController.update);
router.delete('/:accountId/:transactionId', transactionController.delete);

export {
  router as transactionRouter
};
