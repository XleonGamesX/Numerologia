const ai = require('../config/gemini')

const generateContent = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text;

    } catch (error) {
        console.error('Error al comunicarse con Gemini:', error);
        throw new Error('No se puede genrar la interpretacion');
    }
};

module.exports = {
    generateContent
};