const {
    generateReading,
    getReadingHistory
} = require('../services/reading.service');

const generate = async (req, res, next) => {
    try {
        const userId = req.user.id;


        const body = req.body || {};

const type = body.type || 'general';

const reading = await generateReading(
            userId,
            type
        );

res.status(201).json({
            success: true,
            mensaje: 'Lectura generada correctamente',
            lectura: reading
        });

} catch (error) {
        next(error);
    }
};

const history = async (req, res, next) => {
    try {
        const userId = req.user.id;

const readings = await getReadingHistory(userId);

res.status(200).json({
            success: true,
            mensaje: 'Historial obtenido correctamente',
            total: readings.length,
            lecturas: readings
        });

} catch (error) {
        next(error);
    }
};

module.exports = {
    generate,
    history
};

