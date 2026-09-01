const {
    generateProfile,
    getProfile
} = require('../services/numerology.service');



const calculateProfile = async (req, res, next) => {

    try {

        const {
            fullName,
            birthDate
        } = req.body;

        const userId = req.user.id;

        const profile = await generateProfile(
            userId,
            fullName,
            birthDate
        );

        res.status(201).json({
            success: true,
            message: 'Perfil numerológico calculado y guardado exitosamente',
            data: profile
        });

    } catch (error) {

        next(error);

    }
};


// GET /api/v1/numerology/profile
const getMyProfile = async (req, res, next) => {

    try {

        const userId = req.user.id;

        const profile = await getProfile(userId);

        res.status(200).json({
            success: true,
            message: 'Perfil numerológico obtenido correctamente',
            data: profile
        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    calculateProfile,
    getMyProfile
};