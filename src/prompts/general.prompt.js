const buildGeneralPrompt = (profile) => {
    return `
Eres un experto en numerología y debes realizar una interpretación clara,
positiva y personalizada.

Analiza el siguiente perfil numerológico:

- Número de Camino de Vida: ${profile.numero_vida}
- Número de Expresión: ${profile.numero_expresion}
- Número del Alma: ${profile.numero_alma}

Genera una lectura numerológica general para la persona.

La respuesta debe incluir:

1. Interpretación del Camino de Vida.
2. Interpretación del Número de Expresión.
3. Interpretación del Número del Alma.
4. Fortalezas principales.
5. Posibles desafíos.
6. Recomendación final.

Utiliza un lenguaje natural, comprensible y personalizado.
No inventes datos personales que no hayan sido proporcionados.
La numerología debe presentarse como una interpretación simbólica,
no como una predicción científica o certeza absoluta.

Responde únicamente con la interpretación.
`;
};

module.exports = {
    buildGeneralPrompt
};