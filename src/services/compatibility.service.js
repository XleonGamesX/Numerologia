const NumerologyProfile = require('../models/numerologyprofile');

const CompatibilityMatch = require('../models/compatibilitymatch');

const {
    generateContent
} = require('./gemini.service');

const {
    buildCompatibilityPrompt
} = require('../prompts/compatibility.prompt');





const calculateScore = (profile1, profile2) => {

    let score = 0;


    // Camino de vida
    if (
        profile1.numero_vida ===
        profile2.numero_vida
    ) {

        score += 40;

    } else if (
        Math.abs(
            profile1.numero_vida -
            profile2.numero_vida
        ) <= 2
    ) {

        score += 30;

    } else {

        score += 20;

    }


    // Número de expresión
    if (
        profile1.numero_expresion ===
        profile2.numero_expresion
    ) {

        score += 30;

    } else {

        score += 20;

    }


    // Número del alma
    if (
        profile1.numero_alma ===
        profile2.numero_alma
    ) {

        score += 30;

    } else {

        score += 20;

    }


    return score;
};


// CALCULAR COMPATIBILIDAD


const checkCompatibility = async (
    userId1,
    userId2
) => {

    // Buscar perfil del usuario 1
    const profile1 =
        await NumerologyProfile.findOne({
            user: userId1
        });


    // Buscar perfil del usuario 2
    const profile2 =
        await NumerologyProfile.findOne({
            user: userId2
        });


    if (!profile1) {

        throw new Error(
            'El usuario actual no tiene un perfil numerológico'
        );

    }


    if (!profile2) {

        throw new Error(
            'El segundo usuario no tiene un perfil numerológico'
        );

    }


    // Calcular puntaje
    const score = calculateScore(
        profile1,
        profile2
    );


    // Crear prompt
    const prompt =
        buildCompatibilityPrompt(
            profile1,
            profile2,
            score
        );


    // Obtener interpretación de Gemini
    const interpretation =
        await generateContent(prompt);


    // ========================================
    // GUARDAR COMPATIBILIDAD
    // ========================================

    const compatibility =
        new CompatibilityMatch({

            user1: userId1,

            user2: userId2,

            score: score,

            interpretation: interpretation

        });


    const savedCompatibility =
        await compatibility.save();



    // RESPUESTA


    return savedCompatibility;
};


module.exports = {
    checkCompatibility
};