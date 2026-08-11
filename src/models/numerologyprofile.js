
const mongoose = require('mongoose');

const numerologyProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
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

const mongoose = requiere("mongoose");
const numerologyprofileschema = new mongoose.schema(
    {
        user: {
            type: mongoose.Shema.types.objectId,
            ref: "user",
            required: true,
        }
    }
);

