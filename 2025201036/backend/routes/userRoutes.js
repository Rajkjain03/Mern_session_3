import express from 'express';
import { authUser, registerUser, logoutUser } from '../controllers/userController.js';
const router = express.Router();

// Updated routes to match lab requirements
router.post('/signup', registerUser);
router.post('/signin', authUser);
router.post('/logout', logoutUser);

export default router;