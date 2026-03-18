import Gallery from '../models/Gallery.js';

export const addImage = async (req, res) => {
    try {
        const newImage = new Gallery({ imageUrl: req.body.imageUrl });
        await newImage.save();
        res.status(200).json({ success: true, message: 'Image added securely to Gallery', data: newImage });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to add image', error: err.message });
    }
};

export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: gallery.length, data: gallery });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch gallery', error: err.message });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        await Gallery.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Image permanently deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete', error: err.message });
    }
};
