const { body, validationResult } = require("express-validator");

const validateRegister = [
    body("nombre").notEmpty().withMessage("El nombre completo es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("fecha_nacimiento").isISO8601().toDate().withMessage("Formato de fecha inválido (YYYY-MM-DD)"),
    checkValidations
];

const validateCalculate = [
    body("nombre").notEmpty().withMessage("El nombre es requerido para el cálculo"),
    body("fecha_nacimiento").isISO8601().toDate().withMessage("Fecha de nacimiento requerida"),
    checkValidations
];

function checkValidations(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
}

module.exports = {
    validateRegister,
    validateCalculate
};