const express = require('express');

const router = express.Router();

const {
    checkCompatibility
} = require('../controllers/compatibility.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const {
    validateCompatibility
} = require('../validators/comatibility.validator');

router.post(
    '/check',
    authMiddleware,
    validateCompatibility,
    checkCompatibility
);

module.exports = router;