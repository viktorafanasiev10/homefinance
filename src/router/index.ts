import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
const router = Router();
import { userRouter } from './user.router';
import { authRouter } from './auth.router';
import { accountRouter } from './account.router';
import { categoryRouter } from './category.router';
import { subCategoryRouter } from './subcategory.router';
import { transactionRouter } from './transaction.router';

router.use('/', authRouter)
router.use('/users', isAuthenticated, userRouter)
router.use('/accounts', isAuthenticated, accountRouter)
router.use('/categories', isAuthenticated, categoryRouter)
router.use('/sub-categories', isAuthenticated, subCategoryRouter)
router.use('/transactions', isAuthenticated, transactionRouter)
export default router
