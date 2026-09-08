const Reading = require('../models/reading');
const NumerologyProfile = require('../models/numerologyprofile');

const { generateContent } = require('./gemini.service');
const { buildGeneralPrompt } = require('../prompts/general.prompt');
const { buildDailyPrompt } = require('../prompts/daily.prompt');

const generateReading = async (userId, type = 'general') => {

    // Buscar el perfil numerológico del usuario
    const profile = await NumerologyProfile.findOne({
        user: userId
    });

    if (!profile) {
        throw new Error(
            'El usuario no tiene un perfil numerológico. Primero debes calcularlo.'
        );
    }

    // Construir el prompt dependiendo del tipo de lectura
    let prompt;

    switch (type) {
        case 'general':
            prompt = buildGeneralPrompt(profile);
            break;

        case 'diaria':
            prompt = buildDailyPrompt(profile);
            break;

        default:
            throw new Error(
                'Tipo de lectura no válido. Usa: general o diaria.'
            );
    }

    // Enviar prompt a Gemini
    const response = await generateContent(prompt);

    // Guardar lectura en MongoDB
    const reading = new Reading({
        user: userId,
        prompt,
        response,
        type,
        date: new Date()
    });

    const savedReading = await reading.save();

    return savedReading;
};


// Obtener historial de lecturas del usuario
const getReadingHistory = async (userId) => {

    const readings = await Reading.find({
        user: userId
    }).sort({
        createdAt: -1
    });

    return readings;
};


module.exports = {
    generateReading,
    getReadingHistory
};