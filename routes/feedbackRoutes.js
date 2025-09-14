const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { validateFeedback } = require('../middleware/validation');
const {
  createFeedback,
  getUserFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

// All feedback routes require authentication
router.use(authenticate);

router.post('/', validateFeedback, createFeedback);
router.get('/', getUserFeedback);
router.get('/:id', getFeedbackById);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
