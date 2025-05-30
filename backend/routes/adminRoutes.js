const express = require('express');
const { 
    viewPendingVerifications, 
    approvePartner, 
    rejectPartner, 
    fetchKPIStats 
} = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route to view pending partner verifications
router.get('/verifications', authenticate, authorizeAdmin, viewPendingVerifications);

// Route to approve a partner
router.put('/verify/:id', authenticate, authorizeAdmin, approvePartner);

// Route to reject a partner
router.put('/reject/:id', authenticate, authorizeAdmin, rejectPartner);

// Route to fetch admin KPIs
router.get('/stats', authenticate, authorizeAdmin, fetchKPIStats);

module.exports = router;