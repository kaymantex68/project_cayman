const mongoose=require('mongoose')

const contactsSchema= new mongoose.Schema({
    adress: {
        type: String,
    },
    contacts: {
        type: String,
    },
    info: {
        type: String
    },
    position:{
        type: Number,
        default: 1
    }
})

module.exports= mongoose.model("Contacts", contactsSchema)