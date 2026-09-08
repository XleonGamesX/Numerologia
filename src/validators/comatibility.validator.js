const {
    body,
    validationResult
} = require('express-validator');

const validateCompatibility = [
    body('userId2')
        .notEmpty()
        .withMessage('El ID del segundo usuario es obligatorio')
        .isMongoId()
        .withMessage('El ID del segundo usuario no es válido'),

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
    validateCompatibility
};