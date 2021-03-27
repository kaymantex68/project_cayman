const Product = require('../models/product')
const slugify = require('slugify')
const fs = require('fs')
const { listenerCount } = require('../models/product')
const { schedulingPolicy } = require('cluster')
const sub = require('../models/sub')
const { Types } = require('mongoose')

exports.create = async (req, res) => {
    try {
        const { name, brand, type, category, sub, description, lider, params, coast, oldCoast, sale, discount, promotion, active, images } = req.body
        console.log('category----->', category)
        console.log('sub------>', sub)
        const product = await new Product({
            name,
            slug: slugify(name, { lower: true }),
            brand,
            type,
            category,
            sub,
            brandSlug: await slugify(brand, { lower: true }),
            description,
            params,
            lider,
            coast,
            oldCoast,
            sale,
            promotion,
            discount,
            images,
            active
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


exports.listCategoryAndSub = async (req, res) => {
    const { categoryId, subId } = req.body
    console.log('============', categoryId, subId)
    try {
        const products = await Product.find({ category: categoryId, sub: subId })
            .sort({ brand: 1 })
            .exec()
        res.json(products)
    } catch (err) {
        console.log('Ошибка чтения товаров --------->', err)
        res.status(400).send('Ошибка чтения товаров')
    }
}

exports.productsFilter = async (req, res) => {
    const { categoryId, subId, brandSlug, typeSwiper, filterBrand } = req.body
    console.log('body------>', req.body.filterBrand)
    try {
        if (categoryId && subId && brandSlug) {
            const products = await Product.find({ category: categoryId, sub: subId, brandSlug: brandSlug, active: true })
                .sort({ brand: 1 })
                .exec()
            return res.json(products)
        }
        if (categoryId && subId) {
            const products = await Product.find({ category: categoryId, sub: subId, active: true })
                .sort({ brand: 1 })
                .exec()
            return res.json(products)
        }
        if (categoryId) {
            const products = await Product.find({ category: categoryId, active: true })
                .sort({ brand: 1 })
                .exec()
            return res.json(products)
        }

        if (typeSwiper==="sale") {
           
            const products = await Product.find({ sale: true, active: true })
                .sort({ brand: 1 })
                .exec()
            return res.json(products)
        }

        if (typeSwiper==="lider") {
          
            const products = await Product.find({ lider: true, active: true })
                .sort({ brand: 1 })
                .exec()
            return res.json(products)
        }

        if (filterBrand) {
            const products = await Product.find({ brandSlug: filterBrand, active: true })
                .sort({ name: 1 })
                .exec()
            return res.json(products)
        }

        const products = await Product.find({ active: true })
            .sort({ brand: 1 })
            .exec()
        return res.json(products)
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
        const { name, brand, type, category, sub, description, lider, inStock, params, coast, oldCoast, sale, discount, promotion, active } = req.body
        const product = await Product.findOneAndUpdate({ _id: req.params._id }, {
            name,
            slug: slugify(name, { lower: true }),
            brand,
            type,
            category,
            sub,
            brandSlug: await slugify(brand, { lower: true }),
            description,
            inStock,
            params,
            lider,
            coast,
            oldCoast,
            sale,
            promotion,
            discount,
            active
        },
            { new: true })
        console.log('new: ', product)
        res.json(product)
    } catch (err) {
        console.log('Ошибка создания товара --------->', err)
        res.status(400).send('Ошибка обновления товара')
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

exports.removeUnusedImages = async (req, res) => {
    try {
        console.log('------------------------------->', req.data)
        const message = {}
        //    console.log('$$$$$$$$', req.params)
        const { fileName } = req.params
        // console.log('++++++++', fileName)
        await fs.unlink(`${process.env.URI_PRODUCT_PICTURE}/${fileName}`,
            (err) => {
                if (err) {
                    console.log('delete error --------->', err)
                    message.err = err
                }
            })
        message.complete = 'Ok'
        res.json(message)
    } catch (err) {
        console.log('Ошибка удаления изображения --------->', err)
        // res.status(400).send('Ошибка загрузки изображения товара')
        res.status(400).json(message)
    }
}