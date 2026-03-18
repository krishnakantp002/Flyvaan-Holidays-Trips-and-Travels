import express from 'express';
import { addImage, getGallery, deleteImage } from '../controllers/galleryController.js';
import { verifyAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addImage);
router.get('/', getGallery);
router.delete('/:id', verifyToken, verifyAdmin, deleteImage);

export default router;
