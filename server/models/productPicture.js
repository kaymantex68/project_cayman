const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productPictureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        brand: {
            type: String,
        },
        parent: {
            type: ObjectId,
        },
        slug: {
            type: String,
            lowercase:true,
        },
        fileName: {
            type: Array,
        },
        uri: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductPicture", productPictureSchema);
