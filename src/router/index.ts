import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
const router = Router();
import { userRouter } from './user.router';
import { authRouter } from './auth.router';
import { accountRouter } from './account.router';
import { categoryRouter } from './category.controller';
import { subCategoryRouter } from './subcategory.router';

router.use('/', authRouter)
router.use('/users', isAuthenticated, userRouter)
router.use('/accounts', isAuthenticated, accountRouter)
router.use('/categories', isAuthenticated, categoryRouter)
router.use('/sub-categories', isAuthenticated, subCategoryRouter)
export default router
