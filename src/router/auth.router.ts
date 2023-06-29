import { Router } from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

export { router as authRouter };
