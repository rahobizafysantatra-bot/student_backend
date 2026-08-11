import { Router } from 'express';
import * as studentController from '../controllers/student.controller.js';

const router = Router();

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.remove);

export default router;