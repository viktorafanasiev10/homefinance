import { Router } from 'express';
import { subCategoryController } from '../controllers/sub-category.controller.js';

const router = Router();

router.get('/', subCategoryController.getAll);
router.post('/', subCategoryController.create);
router.put('/:subcategoryId', subCategoryController.update);
router.delete('/:subcategoryId', subCategoryController.delete);

export { router as subCategoryRouter };
