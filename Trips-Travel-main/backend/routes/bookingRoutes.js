// bookingRoutes.js

import express from 'express';
import { createBooking, getBooking, getAllBookings, deleteBooking, updateBookingStatus, payBooking } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new booking
router.post('/', verifyToken, createBooking);

// Get a specific booking by ID
router.get('/:id', verifyToken, verifyUser, getBooking);
router.delete('/:id', verifyToken, verifyAdmin, deleteBooking);

// Get all bookings
router.get('/', verifyToken, verifyAdmin, getAllBookings);

// Update booking status
router.put('/:id/status', verifyToken, verifyAdmin, updateBookingStatus);

// Simulate payment
router.post('/:id/pay', verifyToken, payBooking);

export default router;
