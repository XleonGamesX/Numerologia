const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateToken } = require('../config/jwt');


// REGISTRO
const register = async (name, email, password, fecha_nacimiento) => {

    // Verificar 
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
        name,
        email,
        password: hashedPassword,
        fecha_nacimiento
    });

    const savedUser = await user.save();

    // Generar JWT
    const token = generateToken(savedUser._id);

    return {
        user: {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            fecha_nacimiento: savedUser.fecha_nacimiento
        },
        token
    };
};


// LOGIN
const login = async (email, password) => {

    // Buscar usuario
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Correo o contraseña incorrectos');
    }

    // Comcontraseña
    const passwordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrect) {
        throw new Error('Correo o contraseña incorrectos');
    }

    // Crear JWT
    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            fecha_nacimiento: user.fecha_nacimiento
        },
        token
    };
};


module.exports = {
    register,
    login
};