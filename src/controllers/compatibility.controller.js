const {
    checkCompatibility: calculateCompatibility
} = require('../services/compatibility.service');


const checkCompatibility = async (
    req,
    res,
    next
) => {

    try {

        const userId = req.user.id;

        const { userId2 } = req.body;

        const result =
            await calculateCompatibility(
                userId,
                userId2
            );


        res.status(200).json({

            success: true,

            message:
                'Compatibilidad calculada correctamente',

            data: result

        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    checkCompatibility
};