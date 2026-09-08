const express = require('express');

const router = express.Router();

const {
    calculateProfile,
    getMyProfile
} = require('../controllers/numerology.controller');

const {
    validateCalculate
} = require('../validators/numerology.validator');

const authMiddleware = require('../middlewares/auth.middleware');

const {
    generateContent
} = require('../services/gemini.service');


router.get('/gemini-test', async (req, res) => {

    try {

        const prompt = `
        Eres un asistente especializado en numerología.

        Explica brevemente el significado del número 7
        desde una perspectiva numerológica interpretativa.

        La respuesta debe ser clara, positiva y fácil de entender.

        No presentes la numerología como una ciencia comprobada
        ni hagas predicciones absolutas.
        `;

        const response = await generateContent(prompt);

        res.status(200).json({
            success: true,
            response
        });

    } catch (error) {

        console.error('Error en Gemini:', error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


router.post(
    '/calculate',
    authMiddleware,
    validateCalculate,
    calculateProfile
);


router.get(
    '/profile',
    authMiddleware,
    getMyProfile
);


module.exports = router;