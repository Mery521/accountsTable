const { Schema, model } = require("mongoose");

const accountSchema = new Schema(
   {
        name: {
            type: String,
            require: true,
        },
        owner: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Account", accountSchema);