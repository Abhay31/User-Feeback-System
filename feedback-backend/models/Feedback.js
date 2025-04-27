const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    feedbackText: { type: String, required: true },
    category: { type: String, enum: ['Suggestion', 'Bug Report', 'Feature Request'], default: 'Suggestion' },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
