const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name, parent, turn } = req.body
        const sub = await new Sub({ name, slug: slugify(name),parent, turn }).save()
        res.json(sub)
    } catch (err) {
        console.log('Ошибка создания Sub-категории --------->', err)
        res.status(400).send('Ошибка создания Sub-категории.')
    }
}

exports.list = async (req, res) => {
    const subs = await Sub.find({})
        .sort({ parent: 1 })
        .exec()
    res.json(subs)
}

exports.read = async (req, res) => {
    const sub = await Sub.findOne({_id: req.params._id}).exec()
    res.json({ sub })
}

exports.update = async (req, res) => {
    try {
        const { name, parent, turn } = req.body
        const result = await Sub.findOneAndUpdate(
            { _id: req.params._id },
            { name, slug: slugify(name), parent, turn },
            { new: true })
        res.json(result)
    } catch (err) {
        console.log('Ошибка обновления Sub-категории --------->', err)
        res.status(400).send('Ошибка обновления Sub-категории.')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await Sub.findOneAndDelete({ slug: req.params.slug })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления Sub-категории --------->', err)
        res.status(400).send('Ошибка удаления Sub-категории.')
    }
}