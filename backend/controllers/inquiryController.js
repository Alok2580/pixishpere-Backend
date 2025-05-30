// inquiryController.js

const Inquiry = require('../models/Inquiry');
const inquiryService = require('../services/inquiryService');

// Submit a new service inquiry
exports.submitInquiry = async (req, res) => {
    try {
        const { category, date, budget, city, referenceImage } = req.body;
        const newInquiry = new Inquiry({
            category,
            date,
            budget,
            city,
            referenceImage,
            status: 'new',
        });

        const savedInquiry = await newInquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: savedInquiry });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
    }
};

// Fetch assigned leads for partners
exports.getAssignedLeads = async (req, res) => {
    try {
        const partnerId = req.user.id; // Assuming user ID is stored in req.user
        const leads = await inquiryService.getLeadsForPartner(partnerId);
        res.status(200).json({ leads });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error: error.message });
    }
};