const slugify = require('slugify')
const fs = require('fs')
const path = require('path')
const BrandPicture = require('../models/brandPicture')
require("dotenv").config();
//-------------------------------------------------------- save brand picture start
// create a list in data base
exports.create = async (req, res) => {
    try {
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
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
        }
    } catch (err) {
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('-------------create brand picture error-------------')
        console.log(err)
        console.log('-------------create brand picture error-------------')
        return res.status(500).json({ message: '-----create brand error-----' })
    }
}
// create file in folder and update a list to data base
exports.uploadImage = async (req, res) => {
    try {
        
        const slug = req.headers.name
        console.log('-------------file-------------')
        const fileName = `${process.env.URI_BRAND_PICTURE}/${slug}.${req.files.image.mimetype.split('/')[1]}`
        await fs.writeFile(
            fileName,
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
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('|')
        console.log('-------------upload error start-------------')
        console.log(err)
        console.log('-------------upload error end-------------')
        return res.status(500).json({ message: '-----upload error-----' })
    }
}
//-------------------------------------------------------- save brand picture end