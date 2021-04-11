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
    type: {
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
        type: Number,
        default: 0
    },
    coast: {
        type: Number,
    },
    oldCoast: {
        type: Number,
        default: 0,
    },
    sale: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: 0,
    },
    promotion: {
        type: Boolean,
        default: false,
    },
    lider: {
        type: Boolean,
        default: false,
    },
    defaultImage: {
        type: String,
    }, 
    count:{
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    youtube: {
        type: String,
    },
    youtubeTutorial: {
        type: String,
    },
    documents: {
        type: Object
    },
    active:{
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)