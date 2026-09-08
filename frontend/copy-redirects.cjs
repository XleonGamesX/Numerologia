const fs = require('fs');

fs.copyFileSync('_redirects', 'dist/_redirects');

console.log('✓ _redirects copiado a dist/');
