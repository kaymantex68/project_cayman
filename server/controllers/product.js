const Product = require('../models/product')
const slugify = require('slugify')
const fs = require('fs')
const { listenerCount } = require('../models/product')
const { schedulingPolicy } = require('cluster')

exports.create = async (req, res) => {
    try {
        console.log('-------------------------------')
        console.log(req.body)
        console.log('-------------------------------')
        const { name, brand, category, sub, description, params, coast, oldCoast, sale, discount, promotion } = req.body
        console.log('type', typeof (brand))
        console.log('slug', slugify(brand, { lower: true }))
        const product = await new Product({
            name,
            slug: slugify(name, { lower: true }),
            brand,
            category,
            sub,
            brandSlug: await slugify(brand, { lower: true }),
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

exports.read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).exec()
        res.json(product)
    } catch (err) {
        console.log('Ошибка чтения товара --------->', err)
        res.status(400).send('Ошибка чтения товара')
    }
}

exports.update = async (req, res) => {
    try {
        console.log('-------------------------------')
        console.log('body', req.body)
        console.log('params', req.params._id)
        console.log('-------------------------------')
        const { name, brand, category, sub, description, params, coast, oldCoast, sale, discount, promotion } = req.body
        const product = await Product.findOneAndUpdate({ _id: req.params._id }, {
            name,
            slug: slugify(name, { lower: true }),
            brand,
            category,
            sub,
            brandSlug: await slugify(brand, { lower: true }),
            description,
            params,
            coast,
            oldCoast,
            sale,
            promotion,
            discount
        },
            { new: true })
        console.log('new: ', product)
        res.json(product)
    } catch (err) {
        console.log('Ошибка создания товара --------->', err)
        res.status(400).send('Ошибка создания нового товара')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ _id: req.params._id })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления товара --------->', err)
        res.status(400).send('Ошибка удаления товара')
    }
}
// upload image
exports.upload = async (req, res) => {
    const message = {}
    try {
        
        // for  (let i = 0; i < files.length; i++) {
            const slug = req.headers.slug
            const brand = req.headers.slugbrand
            console.log('brand', brand, 'slug', slug)
            let fileName = `${brand}-${slug}-${Date.now()}.${req.files.image.mimetype.split('/')[1]}`
            // uploading file
            await fs.writeFile(
                `${process.env.URI_PRODUCT_PICTURE}/${fileName}`,
                req.files.image.data,
                "binary",
                async (err, data) => {
                    if (err) {
                        // message.err = err
                        return res.json({ message: err })
                    }
                    let result = await Product.findOneAndUpdate(
                        { slug: slug },
                        {
                            "$push": {
                                "images": fileName
                            }
                        },
                        { new: true }
                    )
                    message.result = result
                    res.json(message)
                })
        // }
    } catch (err) {
        console.log('Ошибка создания загрузки изображения --------->', err)
        // res.status(400).send('Ошибка загрузки изображения товара')
        // res.status(400).json(message)
    }
}

exports.removeImage = async (req, res) => {
    try {
        console.log('------------------------------->', req.data)
        const message = {}
        const { slug, fileName } = req.body
        const result = await Product.findOneAndUpdate(
            { slug: slug },
            {
                "$pull": {
                    "images": fileName
                }
            },
            { new: true }
        )
        if (result) {
            message.result = result
            await fs.unlink(`${process.env.URI_PRODUCT_PICTURE}/${fileName}`,
                (err) => {
                    if (err) {
                        console.log('delete error --------->', err)
                        message.err = err
                    }
                })
        }
        message.complete = 'Ok'
        res.json(message)
    } catch (err) {
        console.log('Ошибка удаления изображения --------->', err)
        // res.status(400).send('Ошибка загрузки изображения товара')
        res.status(400).json(message)
    }
}