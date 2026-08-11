//registra que esta pasando con nuestra API
//representa los registros de auditoria y monitoreo de la la  API
//guarda informacion importante de las peticiones realizadas
const mongoose = require("mongoose");
const auditlogSchema = new mongoose.Schema(
    {
        endpoint: {
        type: String,
        required: true,
    },

        method: {
        type: string,
        enum: ["GET", "POST", "PUT", "PATCH", "DELEATE"],
        required: true,
    },

        satus_code: {
        type: number,
        required: true,
    },

    timestamp: {
        type: date,
        required: true,
        default: date.now,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
    },
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(
    "AuditoLog",
    auditlogSchema
);
