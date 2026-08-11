const NumerologyProfile = require('../models/NumerologyProfile');
const { calculateLifePath, calculateExpression, calculateSoul } = require('../utils/numerology');

/**
 * Servicio para calcular y guardar el perfil numerológico.
 * @param {string} userId - El ID del usuario en MongoDB (ObjectId)
 * @param {string} fullName - Nombre completo del usuario
 * @param {string} birthDate - Fecha de nacimiento (YYYY-MM-DD)
 */
const generateProfile = async (userId, fullName, birthDate) => {
    try {
        // 1. Ejecutar los algoritmos matemáticos importados
        const lifePath = calculateLifePath(birthDate);
        const expression = calculateExpression(fullName);
        const soul = calculateSoul(fullName);

        // 2. Crear la instancia del modelo con la referencia al ObjectId del usuario[cite: 1]
        const newProfile = new NumerologyProfile({
            user: userId, 
            numero_vida: lifePath,
            numero_expresion: expression,
            numero_alma: soul
        });

        // 3. Persistir los datos en la colección de MongoDB
        const savedProfile = await newProfile.save();
        
        return savedProfile;
    } catch (error) {
        throw new Error(`Error al generar el perfil numerológico: ${error.message}`);
    }
};

module.exports = {
    generateProfile
};