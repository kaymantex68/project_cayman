const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

// const ProductSchema = new mongoose.Schema({}, { strict: false });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    brand: {
        type: ObjectId,
    },
    brandSlug: {
        type: String, 
    },
    description: {
        type: String,
    },
    params: {
        type: Object,
    },
    coast: {
        type: Number,
    },
    oldCoast:{
        type: Number,
    },
    sale: {
        type: Boolean,
    },
    discount: {
        type: Number,
    },
    promotion:{
        type: Boolean,
    },
    youtube: {
        type: String,
    },
    youtubeTutorial: {
        type: String,
    },
    documents:{
        type: Object
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)