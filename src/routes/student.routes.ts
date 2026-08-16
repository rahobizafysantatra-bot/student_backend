import { Router } from 'express';
import * as studentController from '../controllers/student.controller';
import { authenticate } from '../security/auth.middleware';

const router = Router();

router.get('/', authenticate, studentController.getAll);
router.get('/:id', authenticate, studentController.getById);
router.post('/', authenticate, studentController.create);
router.put('/:id', authenticate, studentController.update);
router.delete('/:id', authenticate, studentController.remove);

export default router;