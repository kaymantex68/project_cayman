const mongoose=require('mongoose')


const categorySchema= new mongoose.Schema({
    name: {
        type: String,
        trim : true,
        required: true,
        minlength:[2, 'Слишком короткое наименование категории']
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase:true,
    },
    turn: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
},{timestamps: true})

module.exports = mongoose.model('Category',categorySchema)