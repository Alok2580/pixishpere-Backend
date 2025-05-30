const express = require('express');
const { 
    createPortfolioEntry, 
    updatePortfolioEntry, 
    deletePortfolioEntry, 
    fetchLeads 
} = require('../controllers/partnerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route to add a new portfolio entry
router.post('/portfolio', authenticate, checkRole('partner'), createPortfolioEntry);

// Route to update an existing portfolio entry
router.put('/portfolio/:id', authenticate, checkRole('partner'), updatePortfolioEntry);

// Route to delete a portfolio entry
router.delete('/portfolio/:id', authenticate, checkRole('partner'), deletePortfolioEntry);

// Route to fetch assigned leads for the partner
router.get('/leads', authenticate, checkRole('partner'), fetchLeads);

module.exports = router;