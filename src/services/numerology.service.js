const NumerologyProfile = require('../models/numerologyprofile');

const {
    calculateLifePath,
    calculateExpression,
    calculateSoul
} = require('../utils/numerology');

const generateProfile = async (
    userId,
    fullName,
    birthDate
) => {
    try {
        const lifePath = calculateLifePath(birthDate);
        const expression = calculateExpression(fullName);
        const soul = calculateSoul(fullName);

        const newProfile = new NumerologyProfile({
            user: userId,
            numero_vida: lifePath,
            numero_expresion: expression,
            numero_alma: soul
        });

        const savedProfile = await newProfile.save();

        return savedProfile;

    } catch (error) {
        throw new Error(
            `Error al generar el perfil numerológico: ${error.message}`
        );
    }
};


// Obtener perfil del usuario autenticado
const getProfile = async (userId) => {

    const profile = await NumerologyProfile.findOne({
        user: userId
    });

    if (!profile) {
        throw new Error(
            'El usuario no tiene un perfil numerológico. Primero debes calcularlo.'
        );
    }

    return profile;
};


module.exports = {
    generateProfile,
    getProfile
};