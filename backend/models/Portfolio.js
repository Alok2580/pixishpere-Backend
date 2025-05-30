const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    descriptions: [{
        type: String,
        required: true
    }],
    order: [{
        type: Number,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

PortfolioSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;