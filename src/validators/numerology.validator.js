/**
 * Middleware de validación para el cálculo del perfil numerológico.
 */
const validateCalculateInput = (req, res, next) => {
    const { fullName, birthDate } = req.body;
    const errors = [];

    // Validar fullName
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
        errors.push('El campo "fullName" es obligatorio y debe ser una cadena de texto.');
    }

    // Validar birthDate (Formato YYYY-MM-DD mediante expresión regular)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate || !dateRegex.test(birthDate)) {
        errors.push('El campo "birthDate" es obligatorio y debe tener el formato YYYY-MM-DD.');
    } else {
        // Verificar si es una fecha cronológicamente válida
        const dateObj = new Date(birthDate);
        if (isNaN(dateObj.getTime())) {
            errors.push('La fecha de nacimiento ingresada no es una fecha válida.');
        }
    }

    // Si existen errores, detener la petición y responder con un código 400 (Bad Request)
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en los datos enviados',
            errors
        });
    }

    // Si todo está correcto, continuar hacia el controlador
    next();
};

module.exports = {
    validateCalculateInput
};