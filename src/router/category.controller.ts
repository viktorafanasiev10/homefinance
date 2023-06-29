import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.js';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.put('/:categoryId', categoryController.update);
router.delete('/:categoryId', categoryController.delete);

export { router as categoryRouter };
