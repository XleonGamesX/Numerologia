const {
    body,
    validationResult
} = require('express-validator');


const validateRegister = [

    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('email')
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener mínimo 6 caracteres'),

    body('fecha_nacimiento')
        .isISO8601()
        .withMessage('La fecha de nacimiento debe tener formato YYYY-MM-DD'),

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


const validateLogin = [

    body('email')
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),

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
    validateRegister,
    validateLogin
};