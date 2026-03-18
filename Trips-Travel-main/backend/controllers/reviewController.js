import Review from '../models/Review.js';
import Tour from '../models/Tour.js'

const createReview = async (req, res) => {
  try {
    const { username, rating, reviewText } = req.body;
    const tourId = req.params.tourId;

    if (!tourId || !rating) {
      return res.status(400).json({ message: 'Tour ID and rating are required' });
    }

    // Find the corresponding tour by ID or Name
    let tour = await Tour.findById(tourId).catch(() => null);
    if (!tour) tour = await Tour.findOne({ title: tourId });

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Create a new review
    const newReview = new Review({ productId: tour._id, reviewText, rating, username });
    await newReview.save();

    // Update the tour with the new review using findByIdAndUpdate to bypass legacy validation errors
    await Tour.findByIdAndUpdate(
      tour._id,
      { $push: { reviews: newReview._id } }
    );

    res.status(201).json({ success: true, message: 'Review created successfully', newReview });
  } catch (error) {
    console.error('Review Create Error: ', error);
    res.status(500).json({ message: 'Internal Server Error: ' + error.message });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Validate review ID
    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    // Find and delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get top reviews for testimonials
const getTopReviews = async (req, res) => {
  try {
    // Fetch up to 5 most recent reviews with a rating of 4 or 5
    const topReviews = await Review.find({ rating: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ success: true, message: 'Successful', data: topReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { createReview, deleteReview, getTopReviews };
