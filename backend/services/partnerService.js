const Partner = require('../models/User'); // Assuming Partner is a User model with a role of 'partner'
const Portfolio = require('../models/Portfolio');
const Inquiry = require('../models/Inquiry');

// Function to onboard a new partner
const onboardPartner = async (partnerData) => {
    const { personalDetails, serviceDetails, documentMetadata, portfolioUrl } = partnerData;

    const newPartner = new Partner({
        ...personalDetails,
        role: 'partner',
        serviceDetails,
        documentMetadata,
        portfolioUrl,
        verificationStatus: 'pending'
    });

    await newPartner.save();
    return newPartner;
};

// Function to verify a partner
const verifyPartner = async (partnerId, status, comment) => {
    const partner = await Partner.findById(partnerId);
    if (!partner) {
        throw new Error('Partner not found');
    }

    partner.verificationStatus = status;
    partner.verificationComment = comment;
    await partner.save();
    return partner;
};

// Function to fetch all partners with pending verifications
const getPendingVerifications = async () => {
    return await Partner.find({ verificationStatus: 'pending' });
};

// Function to fetch leads assigned to a partner
const getAssignedLeads = async (partnerId) => {
    return await Inquiry.find({ assignedTo: partnerId });
};

// Function to manage portfolio entries
const addPortfolioEntry = async (partnerId, portfolioData) => {
    const portfolioEntry = new Portfolio(portfolioData);
    await portfolioEntry.save();

    const partner = await Partner.findById(partnerId);
    partner.portfolio.push(portfolioEntry._id);
    await partner.save();

    return portfolioEntry;
};

// Function to edit a portfolio entry
const editPortfolioEntry = async (entryId, updatedData) => {
    return await Portfolio.findByIdAndUpdate(entryId, updatedData, { new: true });
};

// Function to delete a portfolio entry
const deletePortfolioEntry = async (entryId) => {
    await Portfolio.findByIdAndDelete(entryId);
};

// Function to reorder portfolio entries
const reorderPortfolioEntries = async (partnerId, orderedIds) => {
    const partner = await Partner.findById(partnerId);
    partner.portfolio = orderedIds;
    await partner.save();
};

// Exporting the functions
module.exports = {
    onboardPartner,
    verifyPartner,
    getPendingVerifications,
    getAssignedLeads,
    addPortfolioEntry,
    editPortfolioEntry,
    deletePortfolioEntry,
    reorderPortfolioEntries
};