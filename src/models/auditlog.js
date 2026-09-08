const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
    {
        endpoint: {
            type: String,
            required: true
        },

        method: {
            type: String,
            required: true
        },

        status_code: {
            type: Number,
            required: true
        },

        timestamp: {
            type: Date,
            default: Date.now
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.AuditLog ||
    mongoose.model('AuditLog', auditLogSchema);