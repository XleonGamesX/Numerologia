const express = require('express');
const router = express.Router();
const { calculateProfile } = require('../controllers/numerology.controller');
const { validateCalculateInput } = require('../validators/numerology.validator');

// Middleware para verificar el token JWT (Fase 2-c)
// Asegúrate de que el nombre de la función coincida con la exportación de tu auth.middleware.js
const { verifyToken } = require('../middlewares/auth.middleware');

const {
    gerateContent,
    generateContent
} = require('../services/gemini.service');

router.get('/gemini-test', async (req, res) =>{
    try {
        const prompt = `Eres un asistente especializado en numerologia.
        explica brevemente el significado del numero 7 desde una perspectiva
        numerologica interpretativa.
        
        la respuesta debe ser clara,
        positiva y facil de entender.
        
        no presentes la numerologia como una ciencia comprobada
        no hags predcciones absolutas.
        `;
                const response = await generateContent(prompt);

                res.status(200).json({
                    success: true,
                    response
                });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }

});


/**
 * @route   POST /api/v1/numerology/calculate
 * @desc    Calcula los números centrales (Camino de Vida, Expresión, Alma) y guarda el perfil
 * @access  Privado (Requiere JWT)
 */
router.post('/calculate', verifyToken, validateCalculateInput, calculateProfile);

module.exports = router;