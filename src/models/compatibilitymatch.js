// respresenta el analisis de la compatiabilidad entre dos usuarios
// guarda los usuarios comparados, el puntaje y la interpretacion de la ia

const mongoose = require("mongoose")
const compatibilityMatchSchema = new mongoose.Schema(
    {
        userOne: {
            type: mongoose.schema.types.objectid,
            ref: "user",
            required: true,
        },
        userTwo: {
            type: monogoose.schema.types.objectid,
            ref: "user",
            required: true,
        },
        score:{
            type: Number,
            required: true,
        },
        interpretacion: {
            typw: String,
            required: true,
        }
    
    },
    {
        timestamp: true,
    }
)

module.exports = mongoose.model(
    "compatibilitymatch",
    compatibilitymatchschema
);
