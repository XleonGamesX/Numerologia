const express = require('express');
const router = express.Router();
const { calculateProfile } = require('../controllers/numerology.controller');
const { validateCalculateInput } = require('../validators/numerology.validator');

// Middleware para verificar el token JWT (Fase 2-c)
// Asegúrate de que el nombre de la función coincida con la exportación de tu auth.middleware.js
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/v1/numerology/calculate
 * @desc    Calcula los números centrales (Camino de Vida, Expresión, Alma) y guarda el perfil
 * @access  Privado (Requiere JWT)
 */
router.post('/calculate', verifyToken, validateCalculateInput, calculateProfile);

module.exports = router;