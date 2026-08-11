const { generateProfile } = require('../services/numerology.service');

/**
 * Controlador para calcular y guardar el perfil numerológico del usuario
 * Endpoint: POST /api/v1/numerology/calculate
 */
const calculateProfile = async (req, res) => {
    try {
        // 1. Extraer datos del cuerpo de la petición
        const { fullName, birthDate } = req.body;
        
        // 2. Extraer el ID del usuario. 
        // Nota: Asumimos que el middleware de JWT de la Fase 2 inyecta 'user' en 'req'
        const userId = req.user.id; 

        // 3. Llamar al servicio que construimos en el Paso 2
        const profile = await generateProfile(userId, fullName, birthDate);

        // 4. Retornar la respuesta exitosa al cliente en formato JSON
        res.status(201).json({
            success: true,
            message: 'Perfil numerológico calculado y guardado exitosamente',
            data: profile
        });

    } catch (error) {
        console.error('Error en calculateProfile:', error);
        
        // Manejo de errores devolviendo JSON estructurado
        res.status(500).json({
            success: false,
            message: 'Error en el servidor al procesar el perfil numerológico',
            error: error.message
        });
    }
};

module.exports = {
    calculateProfile
};