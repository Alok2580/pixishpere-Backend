const Partner = require('../models/User'); // Assuming Partner is a User with role 'partner'
const Inquiry = require('../models/Inquiry');
const Review = require('../models/Review');

// Fetch pending partner verifications
exports.getPendingVerifications = async (req, res) => {
    try {
        const pendingPartners = await Partner.find({ role: 'partner', verificationStatus: 'pending' });
        res.status(200).json({ success: true, data: pendingPartners });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Approve or reject partner verification
exports.verifyPartner = async (req, res) => {
    const { id } = req.params;
    const { status, comment } = req.body;

    try {
        const partner = await Partner.findById(id);
        if (!partner) {
            return res.status(404).json({ success: false, message: 'Partner not found' });
        }

        partner.verificationStatus = status;
        partner.verificationComment = comment;
        await partner.save();

        res.status(200).json({ success: true, message: 'Partner verification updated', data: partner });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Fetch high-level KPIs
exports.getKPIs = async (req, res) => {
    try {
        const totalClients = await Partner.countDocuments({ role: 'client' });
        const totalPartners = await Partner.countDocuments({ role: 'partner' });
        const pendingVerifications = await Partner.countDocuments({ verificationStatus: 'pending' });
        const totalInquiries = await Inquiry.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                totalClients,
                totalPartners,
                pendingVerifications,
                totalInquiries
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// View/edit/delete reviews
exports.manageReviews = async (req, res) => {
    const { action, reviewId, reviewData } = req.body;

    try {
        switch (action) {
            case 'view':
                const review = await Review.findById(reviewId);
                return res.status(200).json({ success: true, data: review });
            case 'edit':
                const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
                return res.status(200).json({ success: true, message: 'Review updated', data: updatedReview });
            case 'delete':
                await Review.findByIdAndDelete(reviewId);
                return res.status(200).json({ success: true, message: 'Review deleted' });
            default:
                return res.status(400).json({ success: false, message: 'Invalid action' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Manage categories and locations (CRUD APIs)
exports.manageCategories = async (req, res) => {
    // Implementation for managing categories
};

exports.manageLocations = async (req, res) => {
    // Implementation for managing locations
};