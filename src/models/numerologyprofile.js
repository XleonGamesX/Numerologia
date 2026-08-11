const mongoose = require('mongoose');

const numerologyProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // <-- Revisa si te faltaba esta coma
    numero_vida: {
        type: Number,
        required: true
    },
    numero_expresion: {
        type: Number,
        required: true
    },
    numero_alma: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('NumerologyProfile', numerologyProfileSchema);