const ai = require('../config/gemini');

const MODEL = 'gemini-3.5-flash-lite';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const isRetryableError = (error) => {

    // Errores HTTP temporales de Gemini
    if (
        error.status === 503 ||
        error.status === 429 ||
        error.status === 500 ||
        error.status === 502 ||
        error.status === 504
    ) {
        return true;
    }

    // Errores de conexión de Node / Undici
    if (
        error.name === 'TypeError' &&
        error.message === 'fetch failed'
    ) {
        return true;
    }

    if (
        error.code === 'ECONNRESET' ||
        error.cause?.code === 'ECONNRESET'
    ) {
        return true;
    }

    return false;
};


const generateContent = async (prompt) => {

    const maxAttempts = 4;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            console.log('================================');
            console.log('ENVIANDO PROMPT A GEMINI');
            console.log(`MODELO: ${MODEL}`);
            console.log(`INTENTO: ${attempt}/${maxAttempts}`);
            console.log('================================');


            const response = await ai.models.generateContent({
                model: MODEL,
                contents: prompt
            });


            console.log('================================');
            console.log('RESPUESTA DE GEMINI RECIBIDA');
            console.log('================================');


            return response.text;


        } catch (error) {

            console.error('================================');
            console.error('ERROR REAL DE GEMINI');
            console.error('================================');
            console.error('MESSAGE:', error.message);
            console.error('NAME:', error.name);
            console.error('STATUS:', error.status);
            console.error('CODE:', error.code);
            console.error('CAUSE:', error.cause);
            console.error('================================');


            const retryable = isRetryableError(error);


            if (!retryable || attempt === maxAttempts) {

                if (error.status === 429) {
                    throw new Error(
                        'Se alcanzó el límite de solicitudes de Gemini. Intenta nuevamente más tarde.'
                    );
                }

                if (error.status === 503) {
                    throw new Error(
                        'Gemini está temporalmente saturado. Intenta nuevamente más tarde.'
                    );
                }

                throw new Error(
                    `Error de Gemini: ${error.message}`
                );
            }


            // 2s, 4s, 8s...
            const delay = 2000 * Math.pow(2, attempt - 1);

            console.log(
                `Gemini presentó un error temporal. Reintentando en ${delay / 1000} segundos...`
            );

            await sleep(delay);
        }
    }
};


module.exports = {
    generateContent
};
