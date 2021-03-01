const Category = require('../models/category')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name, turn } = req.body
        const category = await new Category({ name, slug: slugify(name), turn }).save()
        res.json(category)
    } catch (err) {
        console.log('Ошибка создания категории --------->', err)
        res.status(400).send('Ошибка создания категории. Вероятно такая категория уже существует, или наименование категории меньше 2 символов')
    }
}

exports.list = async (req, res) => {
    const categories = await Category.find({})
        .sort({ turn: 1 })
        .exec()
    res.json(categories)
}

exports.read = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug }).exec()
    res.json({ category })
}

exports.update = async (req, res) => {
    try {
        const { name, turn } = req.body
        const result = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name), turn },
            { new: true })
        res.json(result)
    } catch (err) {
        console.log('Ошибка обновления категории --------->', err)
        res.status(400).send('Ошибка обновления категории.')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await Category.findOneAndDelete({ slug: req.params.slug })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления категории --------->', err)
        res.status(400).send('Ошибка удаления категории.')
    }
}