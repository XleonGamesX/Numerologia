const express = require('express');

const router = express.Router();

const {
    generate,
    history
} = require('../controllers/readings.controller');

const authMiddleware = require('../middlewares/auth.middleware');


router.post(
    '/generate',
    authMiddleware,
    generate
);


router.get(
    '/history',
    authMiddleware,
    history
);


module.exports = router;