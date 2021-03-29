const mongoose = require('mongoose')

const Schema=mongoose.Schema

const workModel=new Schema({
    name:{
        type: String,
    },
    slug:{
        type:String,
    },
    coast:{
        type:Number,
    },
    active:{
        type: Boolean,
        default: true,
    }

})

module.exports=mongoose.model("Work", workModel)