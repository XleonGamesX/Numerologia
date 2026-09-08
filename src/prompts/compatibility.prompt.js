const buildCompatibilityPrompt = (profile1, profile2, score) => {
    return `
Eres un experto en numerología y debes analizar la compatibilidad
entre dos personas.

PERFIL DE LA PERSONA 1:
- Camino de Vida: ${profile1.numero_vida}
- Número de Expresión: ${profile1.numero_expresion}
- Número del Alma: ${profile1.numero_alma}

PERFIL DE LA PERSONA 2:
- Camino de Vida: ${profile2.numero_vida}
- Número de Expresión: ${profile2.numero_expresion}
- Número del Alma: ${profile2.numero_alma}

Puntaje de compatibilidad calculado: ${score}/100.

Realiza un análisis que incluya:

1. Compatibilidad general.
2. Compatibilidad emocional.
3. Compatibilidad en comunicación.
4. Fortalezas de la relación.
5. Posibles desafíos.
6. Recomendaciones para mejorar la relación.

Utiliza un lenguaje claro, respetuoso y equilibrado.

No presentes la numerología como una ciencia ni como una predicción
absoluta. Preséntala como una interpretación simbólica.

Responde únicamente con el análisis de compatibilidad.
`;
};

module.exports = {
    buildCompatibilityPrompt
};