const Feedback = require('../models/Feedback');

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { type, subject, message, rating, relatedOrder, relatedProduct } = req.body;
    
    const feedback = new Feedback({
      user: req.user._id,
      type,
      subject,
      message,
      rating,
      relatedOrder,
      relatedProduct
    });

    await feedback.save();

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('user', 'name email')
      .populate('relatedOrder', 'orderNumber')
      .populate('relatedProduct', 'name');

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: { feedback: populatedFeedback }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};

// Get user's feedback
const getUserFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedback = await Feedback.find({ user: req.user._id })
      .populate('relatedOrder', 'orderNumber')
      .populate('relatedProduct', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: {
        feedback,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: error.message
    });
  }
};

// Get single feedback
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('user', 'name email')
      .populate('relatedOrder', 'orderNumber')
      .populate('relatedProduct', 'name')
      .populate('adminResponse.respondedBy', 'name');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Check if user owns this feedback (unless admin)
    if (req.user.role !== 'admin' && feedback.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { feedback }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: error.message
    });
  }
};

// Update feedback (user can only update if status is pending)
const updateFeedback = async (req, res) => {
  try {
    const { subject, message, rating } = req.body;
    
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow updates if status is pending
    if (feedback.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update feedback that is already being processed'
      });
    }

    feedback.subject = subject || feedback.subject;
    feedback.message = message || feedback.message;
    feedback.rating = rating || feedback.rating;

    await feedback.save();

    res.json({
      success: true,
      message: 'Feedback updated successfully',
      data: { feedback }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback',
      error: error.message
    });
  }
};

// Delete feedback (user can only delete if status is pending)
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow deletion if status is pending
    if (feedback.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete feedback that is already being processed'
      });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: error.message
    });
  }
};

module.exports = {
  createFeedback,
  getUserFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};
