import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.updateOne);
router.delete('/:id', userController.delete);

export { router as userRouter };
