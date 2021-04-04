const mongoose=require('mongoose')


const groupDiscountSchema= new mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase:true,
    },
    discounts: {
        type: Object,
    },
    active: {
        type: Boolean,
        default: true,
    },
},{timestamps: true})

module.exports = mongoose.model('GroupDiscount',groupDiscountSchema)