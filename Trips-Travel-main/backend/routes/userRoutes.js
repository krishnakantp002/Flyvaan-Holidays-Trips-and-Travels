import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getAdminRequests,
  approveAdmin,
} from '../controllers/userController.js';

import { verifyAdmin, verifyToken, verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

// Get all admin requests history
router.get('/admin/pending', verifyToken, verifyAdmin, getAdminRequests);

// Approve a pending admin
router.put('/admin/approve/:id', verifyToken, verifyAdmin, approveAdmin);

// Get a single user by ID
router.get('/users/:id', verifyToken, verifyUser, getSingleUser);

// Update a user by ID
router.put('/users/:id', verifyToken, verifyUser, updateUser);

// Delete a user by ID
router.delete('/users/:id', verifyToken, verifyUser, deleteUser);

export default router;
