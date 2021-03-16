const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        console.log('-------------------------------')
        console.log(req.body)
        console.log('-------------------------------')
        const { name, brand, category, sub, description, params, coast, oldCoast, sale, discount, promotion } = req.body
        console.log('type', typeof (brand))
        console.log('slug', slugify(brand,{lower: true}))
        const product = await new Product({
            name,
            slug: slugify(name,{lower: true}),
            brand,
            category,
            sub,
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

exports.read= async(req, res)=>{
    // console.log(req.params.slug)
    try{
        const product = await Product.findOne({slug: req.params.slug}).exec()
        res.json(product)
    }catch(err){
        console.log('Ошибка чтения товара --------->', err)
        res.status(400).send('Ошибка чтения товара')
    }
}

exports.update = async (req, res) => {
    try {
        console.log('-------------------------------')
        console.log('body',req.body)
        console.log('params',req.params._id)
        console.log('-------------------------------')
        const { name, brand, category, sub, description, params, coast, oldCoast, sale, discount, promotion } = req.body
        const product = await Product.findOneAndUpdate({_id: req.params._id},{
            name,
            slug: slugify(name,{lower: true}),
            brand,
            category,
            sub,
            brandSlug: await slugify(brand,{lower: true}),
            description,
            params,
            coast,
            oldCoast,
            sale,
            promotion,
            discount
        },
        {new: true})
        console.log('new: ', product)
        res.json(product)
    } catch (err) {
        console.log('Ошибка создания товара --------->', err)
        res.status(400).send('Ошибка создания нового товара')
    }
}