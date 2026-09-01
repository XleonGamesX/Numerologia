const errorMiddleware = (err, req, res, next) => {

    console.error('================================');
    console.error('ERROR DE LA API');
    console.error('Mensaje:', err.message);
    console.error('================================');

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'El dato ya existe',
            error: err.keyValue
        });
    }

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

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID no válido'
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: err.message
    });
};

module.exports = errorMiddleware;