const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const brandPictureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        slug: {
            type: String,
            lowercase:true,
        },
        fileName: {
            type: String,
        },
        uri: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BrandPicture", brandPictureSchema);
