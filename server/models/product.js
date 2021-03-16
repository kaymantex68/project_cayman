const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

// const ProductSchema = new mongoose.Schema({}, { strict: false });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    brand: {
        type: String,
    },
    brandSlug: {
        type: String,
    },
    category: {
        type: ObjectId,
        // required: true,
        ref: "Category"
    },
    sub: {
        type: ObjectId,
        // required: true,
        ref: "Sub"
    },
    description: {
        type: String,
    },
    params: {
        type: Object,
    },
    inStock: {
        type: String,
    },
    coast: {
        type: Number,
    },
    oldCoast: {
        type: Number,
    },
    sale: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: false,
    },
    promotion: {
        type: Boolean,
        default: false,
    },
    youtube: {
        type: String,
    },
    youtubeTutorial: {
        type: String,
    },
    documents: {
        type: Object
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)