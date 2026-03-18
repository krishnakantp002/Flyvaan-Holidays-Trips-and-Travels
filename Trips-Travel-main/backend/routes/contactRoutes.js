import express from 'express';
import { submitMessage, getMessages, deleteMessage } from '../controllers/contactController.js';
import { verifyAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow anyone (guest or user) to submit a contact message
router.post('/', submitMessage);

// Only Admins can view messages
router.get('/', verifyToken, verifyAdmin, getMessages);

// Only Admins can delete messages
router.delete('/:id', verifyToken, verifyAdmin, deleteMessage);

export default router;
