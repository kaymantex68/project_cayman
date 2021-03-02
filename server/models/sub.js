const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const SubSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlenght: [2, "Слишком короткое имя"],
        },
        slug: {
            type: String,
            // unique: true,
            index: true,
            lowercase: true,
        },
        turn: {
            type: Number,
            required: true
        },
        parent: {
            type: ObjectId,
            required: true,
            ref: "Category"
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Sub", SubSchema);
