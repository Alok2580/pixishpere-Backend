const express = require('express');
const { submitInquiry, fetchAssignedLeads } = require('../controllers/inquiryController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route to submit a new service inquiry
router.post('/', authenticate, authorize('client'), submitInquiry);

// Route to fetch assigned leads for partners
router.get('/leads', authenticate, authorize('partner'), fetchAssignedLeads);

module.exports = router;