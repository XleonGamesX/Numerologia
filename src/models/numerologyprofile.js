const mongoose = requiere("mongoose");
const numerologyprofileschema = new mongoose.schema(
    {
        user: {
            type: mongoose.Shema.types.objectId,
            ref: "user",
            required: true,
        }
    }
)