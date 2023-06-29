import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
const router = Router();
import { userRouter } from './user.router';
import { authRouter } from './auth.router';

router.use('/', authRouter)
router.use('/users', isAuthenticated, userRouter)

export default router
