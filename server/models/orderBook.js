const mongoose = require('mongoose')

const { ObjectId }= mongoose.Schema

const orderBookSchema= new mongoose.Schema({
    orderId: {
        type: String,
    },
    products: {
        type: Array,
    },
    status: {
        type: Array,
    },
    statusIndex: {
        type: Number,
    },
    orderBy:{
        type: ObjectId,
        ref : "User",
    },
    sum: {
        type: Number,
    },
    sumDiscount: {
        type: Number,
    },
}, { timestamps: true })

module.exports= new mongoose.model("OrderBook", orderBookSchema)