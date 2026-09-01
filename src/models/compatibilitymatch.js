const mongoose = require('mongoose');

const compatibilityMatchSchema = new mongoose.Schema(
    {
        user1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        user2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        interpretation: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.CompatibilityMatch ||
    mongoose.model(
        'CompatibilityMatch',
        compatibilityMatchSchema
    );