
const reduceNumber = (num) => {
    let current = parseInt(num, 10);
    
    while (current > 9) {
        if (current === 11 || current === 22 || current === 33) {
            return current;
        }
        
        current = String(current)
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    
    return current;
};

module.exports = { reduceNumber };