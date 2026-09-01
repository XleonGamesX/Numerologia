const {
    register,
    login
} = require('../services/auth.service');

const registerUser = async (req, res, next) => {
    try {
        console.log('================================');
        console.log('BODY RECIBIDO:', req.body);
        console.log('CONTENT-TYPE:', req.headers['content-type']);
        console.log('================================');

        const {
            name,
            email,
            password,
            fecha_nacimiento
        } = req.body || {};

        if (!name || !email || !password || !fecha_nacimiento) {
            return res.status(400).json({
                success: false,
                mensaje: 'Faltan datos obligatorios',
                campos_requeridos: [
                    'name',
                    'email',
                    'password',
                    'fecha_nacimiento'
                ],
                body_recibido: req.body || null
            });
        }

        const result = await register(
            name,
            email,
            password,
            fecha_nacimiento
        );

        res.status(201).json({
            success: true,
            mensaje: 'Usuario registrado correctamente',
            ...result
        });

    } catch (error) {
        next(error);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                mensaje: 'Email y contraseña son obligatorios'
            });
        }

        const result = await login(
            email,
            password
        );

        res.status(200).json({
            success: true,
            mensaje: 'Inicio de sesión exitoso',
            ...result
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    registerUser,
    loginUser
};