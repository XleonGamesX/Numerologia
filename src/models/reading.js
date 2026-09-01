const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        prompt: {
            type: String,
            required: true
        },

        response: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ['diaria', 'general', 'anual'],
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Reading', readingSchema);