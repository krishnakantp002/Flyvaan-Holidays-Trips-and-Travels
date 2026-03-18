import express from 'express';
import { createReview, deleteReview, getTopReviews } from '../controllers/reviewController.js';
import { verifyUser } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get top reviews globally
router.get('/top', getTopReviews);

// Create a new review
router.post('/:tourId', verifyUser, createReview);

// Delete a review by ID
router.delete('/:id', verifyUser, deleteReview);

export default router;
