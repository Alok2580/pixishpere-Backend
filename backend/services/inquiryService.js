const Inquiry = require('../models/Inquiry');
const User = require('../models/User');
const Partner = require('../models/Partner'); // Assuming a Partner model exists
const mongoose = require('mongoose');

// Create a new inquiry
const createInquiry = async (inquiryData) => {
    try {
        const inquiry = new Inquiry(inquiryData);
        await inquiry.save();
        return inquiry;
    } catch (error) {
        throw new Error('Error creating inquiry: ' + error.message);
    }
};

// Fetch assigned leads for a partner
const fetchAssignedLeads = async (partnerId) => {
    try {
        const inquiries = await Inquiry.find({ assignedTo: partnerId });
        return inquiries;
    } catch (error) {
        throw new Error('Error fetching assigned leads: ' + error.message);
    }
};

// Match inquiries to partners based on category and location
const matchInquiriesToPartners = async (inquiry) => {
    try {
        const partners = await Partner.find({
            services: { $in: [inquiry.category] },
            location: inquiry.city
        });

        // Logic to assign inquiry to a partner (e.g., round-robin, random, etc.)
        if (partners.length > 0) {
            const assignedPartner = partners[Math.floor(Math.random() * partners.length)];
            inquiry.assignedTo = assignedPartner._id;
            await inquiry.save();
            return assignedPartner;
        }
        return null;
    } catch (error) {
        throw new Error('Error matching inquiries to partners: ' + error.message);
    }
};

// Update inquiry status
const updateInquiryStatus = async (inquiryId, status) => {
    try {
        const inquiry = await Inquiry.findById(inquiryId);
        if (!inquiry) {
            throw new Error('Inquiry not found');
        }
        inquiry.status = status;
        await inquiry.save();
        return inquiry;
    } catch (error) {
        throw new Error('Error updating inquiry status: ' + error.message);
    }
};

module.exports = {
    createInquiry,
    fetchAssignedLeads,
    matchInquiriesToPartners,
    updateInquiryStatus
};