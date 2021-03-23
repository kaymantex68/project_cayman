const mongoose =require('mongoose')

const Schema = mongoose.Schema

const SliderSchema = new Schema({
    name:{
        type: String,
        unique: true,
    },
    slug: {
        type:String,
        unique: true,
        lowercase: true,
    },
    turn: {
        type: Number,
    },
    backgroundImage:{
        type: String,
        default: '',
    },
    mainImage:{
        type:String,
        default: '',
    },
    active:{
        type: Boolean,
        default: true,
    }
})

module.exports=mongoose.model("Slider", SliderSchema)