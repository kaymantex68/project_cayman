const slugify = require('slugify')
const fs = require('fs')
const path = require('path')
const BrandPicture = require('../models/brandPicture')
const ProductPicture= require('../models/productPicture')
require("dotenv").config();
//-------------------------------------------------------- save brand picture start
// create a list in data base
exports.createBrand = async (req, res) => {
    try {
        console.log('-------------brand name-------------')
        console.log(req.body)
        console.log('-------------brand name-------------')
        const { name } = req.body
        const result = await BrandPicture.findOneAndUpdate({ slug: slugify(name) }, { name, slug: slugify(name) }, { new: true })
        if (result) {
            res.json(result)
            console.log('-------------result-------------')
            console.log(result)
            console.log('-------------result-------------')
        } else {
            const newResult = await new BrandPicture({ name, slug: slugify(name) }).save()
            console.log('-------------result-------------')
            console.log(newResult)
            console.log('-------------result-------------')
            res.json(newResult)
        }
    } catch (err) {
        console.log('-------------create brand picture error-------------')
        console.log(err)
        console.log('-------------create brand picture error-------------')
        return res.status(500).json({ message: '-----create brand error-----' })
    }
}
// create file in folder and update a list to data base
exports.uploadBrandImage = async (req, res) => {
    try {
        const slug = req.headers.name
        console.log('-------------file-------------')
        console.log(req.files.image.data)
        console.log('-------------file-------------')
        const fileName = `${slug}.${req.files.image.mimetype.split('/')[1]}`
        await fs.writeFile(
            `${process.env.URI_BRAND_PICTURE}/${fileName}`,
            req.files.image.data,
            "binary",
            (err) => {
                if (err) return console.log(err);
            });
        const result = await BrandPicture.findOneAndUpdate({ slug }, { fileName }, { new: true })
        if (result) {
            console.log('-------------file was saved-------------')
            console.log("The file was saved!");
            console.log('-------------file was saved-------------')
        }
        return res.json({ message: 'upload complete' })
    } catch (err) {
        console.log('-------------upload error start-------------')
        console.log(err)
        console.log('-------------upload error end-------------')
        return res.status(500).json({ message: '-----upload error-----' })
    }
}
//-------------------------------------------------------- save brand picture end


exports.getBrandImageInfo = async (req, res) => {
    try {
        const brandInfo = await BrandPicture.findOne({ name: req.params.name }).exec()
        res.json(brandInfo)
    } catch (err) {
        console.log('-------------get brand picture info error-------------')
    }
}

exports.brandList = async (req, res) => {
    const result = await BrandPicture.find({})
        .sort({ parent: 1 })
        .exec()
    res.json(result)
}

/////////////////////////////////---PRODUCT IMAGE---///////////////////////////////////


exports.uploadProductImage = async (req, res) => {
    try {
        const message = {}
        const slug = req.headers.name
        const brand = req.headers.brand
        console.log('-------------IMAGE INFO-------------')
        console.log(slug)
        console.log(brand)
        console.log('-------------IMAGE INFO-------------')
        console.log('-------------IMAGE PRODUCT-------------')
        console.log(req.files.image.data)
        console.log('-------------IMAGE PRODUCT-------------')
        const fileName = await `${slug}-${Date.now()}.${req.files.image.mimetype.split('/')[1]}`
        await fs.mkdir(`${process.env.URI_PRODUCT_PICTURE}/${brand}`, async (err, data) => {
            if (err) {
                console.log('-----error create folder 1-----', err);
                message.message1 = 'error create folder 1'
            }
            else {
                console.log('-----create folder 1 complete-----', data)
                message.message1 = 'create folder 1 complete'
            }
            fs.mkdir(`${process.env.URI_PRODUCT_PICTURE}/${brand}/${slug}`, async (err, data) => {
                if (err) {
                    console.log('-----error create folder 2-----', err);
                    message.message2 = 'error create folder 2'
                }
                else {
                    console.log('-----create folder 2 complete-----', data)
                    message.message2 = 'create folder 2 complete'
                }
                fs.writeFile(
                    `${process.env.URI_PRODUCT_PICTURE}/${brand}/${slug}/${fileName}`,
                    req.files.image.data,
                    "binary",
                    async (err, data) => {
                        if (err) {
                            console.log('-----error create file-----', err);
                            message.message3 = `error create file`
                        }
                        else {
                            console.log('-----create file complete-----', data)
                            message.message3 = `create file complete ${fileName}`
                            // write data to data base
                            const result = await ProductPicture.findOneAndUpdate({name: slug},
                                {"$push":{
                                    "fileName": fileName
                                }},
                                {new: true})
                            if (result) {
                                console.log('-----create data complete-----', result)
                                message.message4 = `create data complete`
                                message.result=result
                            } else {
                                const newResult = await new ProductPicture({name: slug, fileName:[fileName], brand }).save()
                                if (newResult) {
                                    console.log('-----create data complete-----', result)
                                    message.message4 = `create data complete`
                                    message.result=newResult
                                } else {
                                    console.log('-----create data error-----')
                                    message.message4 = `create data error`
                                }
                            }
                            return res.json(message)
                        }
                    });
            })
        })
    } catch (err) {
        console.log('-------------upload error start-------------')
        console.log(err)
        console.log('-------------upload error end-------------')
        return res.status(500).json({ message: '-----upload error-----'})
    }
}

exports.deleteProductImage= async(req, res)=>{
    try{
        let message={}
        const result = await ProductPicture.findOneAndDelete({fileName: req.params.fileName})
        if (result){
            const path = `${process.env.URI_PRODUCT_PICTURE}/${result.brand}/${result.name}/${result.fileName}`
            message.result={result}
            await fs.unlink(path,(err)=>{
                if (err) {
                    console.log('-----error delete product image-----', err);
                    message.message1 = 'error delete product image'
                }
                res.json(message)
            })
        }else{
                console.log('-----error create folder 1-----', err);
                message.error = 'error delete data from database'   
        }
        
    }catch(err){
        console.log('-------------delete error start-------------')
        console.log(err)
        console.log('-------------delete error end-------------')
        return res.status(500).json({ message: '-----delete error-----'})
    }
}