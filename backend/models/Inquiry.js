const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    referenceImageUrl: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['new', 'responded', 'booked', 'closed'],
        default: 'new',
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);