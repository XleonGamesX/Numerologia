const AuditLog = require('../models/auditlog');

const auditMiddleware = (req, res, next) => {

    res.on('finish', async () => {

        try {

            await AuditLog.create({

                endpoint: req.originalUrl,

                method: req.method,

                status_code: res.statusCode,

                timestamp: new Date(),

                user_id: req.user?.id || null

            });

            console.log(
                `AUDIT: ${req.method} ${req.originalUrl} -> ${res.statusCode}`
            );

        } catch (error) {

            console.error(
                'Error guardando AuditLog:',
                error.message
            );

        }

    });

    next();
};

module.exports = auditMiddleware;