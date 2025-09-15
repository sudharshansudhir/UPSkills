import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users?role=student
router.get('/', getUsers);

export default router;
