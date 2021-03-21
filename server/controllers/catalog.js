const Product = require('../models/product')
const Category = require('../models/category')
const Sub = require('../models/sub')

exports.list = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ brand: 1 })
            .exec()
        res.json(products)
    } catch (err) {
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}

exports.listCategory = async (req, res) => {
    try {
        const products = await Product.find({"category": req.params.category})
            .sort({ brand: 1 })
            .exec()
        res.json(products)
    } catch (err) {
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}

exports.listSub = async (req, res) => {
    const {parent} = req.body
    console.log(req.body)
    console.log('parent', parent)
    console.log('slug', req.params.sub)
    try {
        const products = await Product.find({})
            .sort({ brand: 1 })
            .exec()
        res.json(products)
    } catch (err) {
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}

exports.listBrand = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ brand: 1 })
            .exec()
        res.json(products)
    } catch (err) {
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}







