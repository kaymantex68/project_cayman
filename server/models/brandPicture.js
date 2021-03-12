const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const brandPictureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        slug: {
            type: String,
        },
        uri: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BrandPicture", brandPictureSchema);
