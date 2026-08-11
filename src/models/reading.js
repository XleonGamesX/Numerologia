const mongoose = require("mongoose")

const readingSchema = new mongoose.Schema(
    {
        prompt:{
            type: String,
            required: true,
        },

        response: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["diria", "general", "anual"],
            required: true,
        },

        date: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)