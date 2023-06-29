import { Router } from 'express';
import { accountController } from '../controllers/account.controller';

const router = Router();

router.get('/', accountController.getAll);
// router.get('/:id', accountController);
router.post('/', accountController.create);
router.put('/:id', accountController.update);
router.delete('/:id', accountController.delete);

export { router as accountRouter };
