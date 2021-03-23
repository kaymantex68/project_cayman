const Slider = require('../models/slider')
const fs = require('fs')
const slugify = require('slugify')


exports.create = async (req, res) => {
    const message = {}
    try {
        const name=req.body.name
        const typeimage=req.body.typeimage
      
        const slug = slugify(name, { lower: true })
        const { image } = req.files
        console.log('-----------------------------------')
        console.log('file', image)
        console.log('-----------------------------------')

        if (typeimage !== "mainImage" && typeimage !== "backgroundImage") return res.json({ mesage: "неверный header" })

        let result =null;
        const findResult=await Slider.findOne({ slug }).exec()
        console.log('findResult', findResult)
        if (!findResult) {
            result = await new Slider({
                name,
                slug,
            }).save()
            console.log('result', result)
        }

        if (result || findResult) {
            // uploadingFile
            let fileName;
            if (typeimage === "mainImage") fileName = `${name}-main-${Date.now()}.${req.files.image.mimetype.split('/')[1]}`
            if (typeimage === "backgroundImage") fileName = `${name}-background-${Date.now()}.${req.files.image.mimetype.split('/')[1]}`
            fileName=slugify(fileName, { lower: true })
            console.log('fileName', fileName)
            await fs.writeFile(
                `${process.env.URI_SLIDER_PICTURE}/${fileName}`,
                req.files.image.data,
                "binary",
                async (err, data) => {
                    if (err) {
                        // message.err = err
                        return res.json({ message: err })
                    }
                    let result;
                    if (typeimage === "mainImage") result = await Slider.findOneAndUpdate(
                        { slug: slug },
                        {
                            "$set": {
                                "mainImage": fileName
                            }
                        },
                        { new: true }
                    )
                    if (typeimage === "backgroundImage") result = await Slider.findOneAndUpdate(
                        { slug: slug },
                        {
                            "$set": {
                                "backgroundImage": fileName
                            }
                        },
                        { new: true }
                    )
                    message.result = result
                    res.json(message)
                })
        }
    } catch (err) {
        console.log('Ошибка создания слайда --------->', err)
        res.status(400).send('Ошибка создания нового слайда')
    }
}



exports.read = async (req, res) => {
    try {
        const result = await Slider.findOne({ slug: req.params.slug }).exec()
        res.json(result)
    } catch (err) {
        console.log('Ошибка чтения слайда --------->', err)
        res.status(400).send('Ошибка чтения слайда')
    }
}

exports.list = async(req, res)=>{
    const result = await Slider.find({}).sort({name: 1}).exec()
    res.json(result)
}

exports.remove = async (req, res) => {
    try {
        console.log(req.params.slug)
        const result = await Slider.findOneAndDelete({ slug: req.params.slug })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления слайда --------->', err)
        res.status(400).send('Ошибка удаления слайда.')
    }
}
