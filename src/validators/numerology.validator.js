const { body, validationResult } = require('express-validator');

const validateCalculate = [
    body('fullName')
        .notEmpty()
        .withMessage('El nombre completo es obligatorio'),

    body('birthDate')
        .isISO8601()
        .withMessage('La fecha debe tener formato YYYY-MM-DD'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];


module.exports = {
    validateCalculate
};