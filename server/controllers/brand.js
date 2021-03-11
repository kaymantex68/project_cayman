const Brand = require('../models/brand')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name, turn, parent } = req.body
        const brand = await new Brand({ name, slug: slugify(name), turn, parent }).save()
        res.json(brand)
    } catch (err) {
        console.log('Ошибка создания бренда --------->', err)
        res.status(400).send('Ошибка создания бренда!')
    }
}

exports.list = async (req, res) => {
    const brands = await Brand.find({})
        .sort({ turn: 1 })
        .exec()
    res.json(brands)
}

exports.read = async (req, res) => {
    // console.log('------------------get brand----------------', req.params)
    const brand = await Brand.findOne({ _id: req.params._id }).exec()
    res.json({ brand })
}

exports.update = async (req, res) => {
    try {
        // console.log('------------update---------------',req.params)
        const { name, turn, active, parent } = req.body
        const result = await Brand.findOneAndUpdate(
            { _id: req.params._id },
            { name, slug: slugify(name), turn, active, parent },
            { new: true })
        res.json(result)
        console.log('result', result)
    } catch (err) {
        console.log('Ошибка обновления бренда --------->', err)
        res.status(400).send('Ошибка обновления бренда.')
    }
}

exports.remove = async (req, res) => {
    try {
        console.log('------------delete---------------',req.params)
        const result = await Brand.findOneAndDelete({ _id: req.params._id })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления бренда --------->', err)
        res.status(400).send('Ошибка удаления бренда.')
    }
}