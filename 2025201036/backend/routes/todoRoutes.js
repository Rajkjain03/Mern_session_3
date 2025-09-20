import express from 'express';
import { getTodos, createTodo, deleteTodo } from '../controllers/todoController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(protect);
router.route('/').get(getTodos).post(createTodo);
router.route('/:id').delete(deleteTodo);

export default router;