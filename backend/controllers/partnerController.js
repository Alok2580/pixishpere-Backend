const Partner = require('../models/User'); // Assuming User model is used for partners
const Portfolio = require('../models/Portfolio');
const Inquiry = require('../models/Inquiry');
const partnerService = require('../services/partnerService');

// Submit service details for a partner
exports.submitServiceDetails = async (req, res) => {
    try {
        const { personalDetails, serviceDetails, documentMetadata, portfolioUrl } = req.body;
        const partner = new Partner({
            ...personalDetails,
            serviceDetails,
            documentMetadata,
            portfolioUrl,
            role: 'partner',
            verificationStatus: 'pending'
        });
        await partner.save();
        res.status(201).json({ message: 'Partner submitted successfully for verification.' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting partner details.', error });
    }
};

// Fetch assigned leads for a partner
exports.fetchAssignedLeads = async (req, res) => {
    try {
        const partnerId = req.user.id; // Assuming user ID is stored in req.user
        const leads = await Inquiry.find({ assignedTo: partnerId });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads.', error });
    }
};

// Add portfolio entry
exports.addPortfolioEntry = async (req, res) => {
    try {
        const { description, imageUrl } = req.body;
        const portfolioEntry = new Portfolio({
            partnerId: req.user.id,
            description,
            imageUrl
        });
        await portfolioEntry.save();
        res.status(201).json({ message: 'Portfolio entry added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding portfolio entry.', error });
    }
};

// Edit portfolio entry
exports.editPortfolioEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, imageUrl } = req.body;
        const updatedEntry = await Portfolio.findByIdAndUpdate(id, { description, imageUrl }, { new: true });
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error editing portfolio entry.', error });
    }
};

// Delete portfolio entry
exports.deletePortfolioEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Portfolio.findByIdAndDelete(id);
        res.status(200).json({ message: 'Portfolio entry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting portfolio entry.', error });
    }
};