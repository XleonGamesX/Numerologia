const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensaje: 'Token de autenticación requerido'
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'Formato de token inválido'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};

module.exports = authMiddleware;