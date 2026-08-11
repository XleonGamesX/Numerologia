/**
 * Reduce un número a un solo dígito sumando sus componentes.
 * Excepción: Números maestros (11, 22, 33) no se reducen.
 */
const reduceNumber = (num) => {
    // Asegurarnos de trabajar con un número entero
    let current = parseInt(num, 10);
    
    while (current > 9) {
        // Validación de números maestros
        if (current === 11 || current === 22 || current === 33) {
            return current;
        }
        
        // Convertir a string, separar los dígitos, sumarlos y volver a entero
        current = String(current)
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    return current;
};

module.exports = { reduceNumber };