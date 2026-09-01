const buildDailyPrompt = (profile) => {
    return `
Eres un experto en numerología.

Realiza una lectura numerológica diaria personalizada utilizando este perfil:

- Camino de Vida: ${profile.numero_vida}
- Número de Expresión: ${profile.numero_expresion}
- Número del Alma: ${profile.numero_alma}

La lectura debe incluir:
1. Energía general del día.
2. Amor y relaciones.
3. Trabajo y estudios.
4. Bienestar personal.
5. Consejo numerológico del día.
La respuesta debe ser positiva, clara y práctica.
No presentes la numerología como una ciencia ni como una predicción
absoluta. Preséntala como una interpretación simbólica.
Responde únicamente con la lectura.
`;
};

module.exports = {
    buildDailyPrompt
};