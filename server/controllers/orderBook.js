const OrderBook = require('../models/orderBook')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        
        const { orderId, products, status, statusIndex, orderBy, seller, sum, sumDiscount } = req.body.order
        console.log(req.body.order)
        const order = await new OrderBook({ orderId, products, status, statusIndex, orderBy, seller,sum, sumDiscount  }).save()
        res.json(order)
    } catch (err) {
        console.log('Ошибка создания ордера --------->', err)
        res.status(400).send('Ошибка создания ордера')
    }
}

exports.list = async (req, res) =>{
    const result = await OrderBook.find()
    .populate("orderBy")
    .exec()
    res.json(result)
}