const { reduceNumber } = require('./reducer');
const { letterValues, vowels } = require('./nameValue');

/**
 * @param {string} birthDateString - Fecha en formato YYYY-MM-DD
 */
const calculateLifePath = (birthDateString) => {
    // Eliminar guiones o cualquier carácter que no sea un dígito
    const cleanDate = birthDateString.replace(/\D/g, ''); 
    
    // Sumar todos los dígitos de la fecha
    const sum = cleanDate
        .split('')
        .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
        
    return reduceNumber(sum);
};

/**
 * Calcula el número de "Expresión" sumando todas las letras del nombre.
 * @param {string} fullName - Nombre completo del usuario
 */
const calculateExpression = (fullName) => {
    // Convertir a minúsculas y eliminar espacios o caracteres especiales
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    let sum = 0;
    
    for (const char of cleanName) {
        if (letterValues[char]) {
            sum += letterValues[char];
        }
    }
    
    return reduceNumber(sum);
};

/**
 * Calcula el número del "Alma" sumando únicamente las vocales del nombre.
 * @param {string} fullName - Nombre completo del usuario
 */
const calculateSoul = (fullName) => {
    // Convertir a minúsculas y eliminar espacios o caracteres especiales
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    let sum = 0;
    
    for (const char of cleanName) {
        // Verificar que la letra sea una vocal y exista en el diccionario
        if (vowels.includes(char) && letterValues[char]) {
            sum += letterValues[char];
        }
    }
    
    return reduceNumber(sum);
};

module.exports = {
    calculateLifePath,
    calculateExpression,
    calculateSoul
};