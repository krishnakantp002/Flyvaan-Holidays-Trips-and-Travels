import express from 'express';
import { generateHash, paymentSuccess, paymentFailure } from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to generate payment hash
// Need to use verifyToken so only logged-in users can initiate payment
router.post('/hash', verifyToken, generateHash);

// Callback routes should not have verifyToken because PayU servers call them
router.post('/success', paymentSuccess);
router.post('/failure', paymentFailure);

export default router;
