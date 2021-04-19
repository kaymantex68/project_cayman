const OrderBook = require('../models/orderBook')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        
        const { orderId, products, status, statusIndex, orderBy, seller, sum, sumDiscount } = req.body.order
        // console.log(req.body.order)
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

exports.update = async (req, res) => {
    try {
        const { orderId, products, status, statusIndex, orderBy, seller, sum, sumDiscount } = req.body.order
        const result = await OrderBook.findOneAndUpdate(
            { _id: req.params._id },
            { orderId, products, status, statusIndex, orderBy, seller, sum, sumDiscount },
            { new: true })
        res.json(result)
    } catch (err) {
        console.log('Ошибка обновления заказа --------->', err)
        res.status(400).send('Ошибка обновления заказа.')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await OrderBook.findOneAndDelete({ _id: req.params._id })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления ордера --------->', err)
        res.status(400).send('Ошибка удаления ордера.')
    }
}