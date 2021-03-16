const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        console.log('-------------------------------')
        console.log(req.body)
        console.log('-------------------------------')
        const { name, brand, description, params, coast, oldCoast, sale, discount, promotion } = req.body
        console.log('type', typeof (brand))
        console.log('slug', slugify(brand,{lower: true}))
        const product = await new Product({
            name,
            slug: slugify(name,{lower: true}),
            brand,
            brandSlug: await slugify(brand,{lower: true}),
            description,
            params,
            coast,
            oldCoast,
            sale,
            promotion,
            discount
        }).save()
        res.json(product)
    } catch (err) {
        console.log('Ошибка создания товара --------->', err)
        res.status(400).send('Ошибка создания нового товара')
    }
}

exports.list = async(req, res)=>{
    try{
        const products = await Product.find({})
        .sort({brand: 1})
        .exec()
        res.json(products)
    }catch(err){
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}