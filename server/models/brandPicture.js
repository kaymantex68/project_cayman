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
        },
        active:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BrandPicture", brandPictureSchema);
