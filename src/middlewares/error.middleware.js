const errorMiddleware = (err, req, res, next) => {

    console.error('================================');
    console.error('ERROR DE LA API');
    console.error('Mensaje:', err.message);
    console.error('================================');

    // Email ya registrado
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'El dato ya existe',
            error: err.keyValue
        });
    }

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: Object.values(err.errors).map(error => ({
                campo: error.path,
                mensaje: error.message
            }))
        });
    }

    // ID inválido
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID no válido'
        });
    }

    // Errores conocidos de nuestra aplicación
    const knownErrors = [
        'Correo o contraseña incorrectos',
        'El usuario no tiene un perfil numerológico. Primero debes calcularlo.',
        'Tipo de lectura no válido. Usa: general o diaria.'
    ];

    if (knownErrors.includes(err.message)) {

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Error desconocido
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};

module.exports = errorMiddleware;
