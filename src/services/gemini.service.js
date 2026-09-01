const ai = require('../config/gemini');

const generateContent = async (prompt) => {
try {
console.log('----brother mira aki----');
console.log('ENVIANDO PROMPT A GEMINI');
console.log('MODELO: gemini-3.6-flash');
console.log('----brother mira aki----');

    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
    });

    console.log('RESPUESTA DE GEMINI RECIBIDA');
    console.log('----brother mira aki----');

    return response.text;

} catch (error) {
    console.error('----brother mira aki----');
    console.error('ERROR REAL DE GEMINI:');
    console.error(error.message);
    console.error('----brother mira aki----');

    if (error.status === 503) {
        throw new Error(
            'Gemini está temporalmente saturado. Intenta nuevamente en unos segundos.'
        );
    }

    if (error.status === 429) {
        throw new Error(
            'Se alcanzó el límite de solicitudes de Gemini. Intenta nuevamente más tarde.'
        );
    }

    throw new Error(
        `Error de Gemini: ${error.message}`
    );
}
};

module.exports = {
generateContent
};