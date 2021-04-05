const GroupDiscount = require('../models/groupDiscount')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name, discounts } = req.body
        console.log('new--------------', req.body)
        const groupDiscount = await new GroupDiscount({ name, slug: slugify(name), discounts }).save()
        res.json(groupDiscount)
    } catch (err) {
        console.log('Ошибка создания скидочной группы --------->', err)
        res.status(400).send('Ошибка создания скидочной группы')
    }
}

exports.list = async (req, res) => {
    const groupDiscounts = await GroupDiscount.find({})
        // .sort({ turn: 1 })
        .exec()
    res.json(groupDiscounts)
}


exports.read = async (req, res) => {
    const groupDiscount = await GroupDiscount.findOne({ slug: req.params.slug }).exec()
    res.json(groupDiscount)
}

exports.update = async (req, res) => {
    try {
        console.log('update--------------------', req.body)
        const { name, discounts, active } = req.body
        const result = await GroupDiscount.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name), discounts, active },
            { new: true })
        res.json(result)
    } catch (err) {
        console.log('Ошибка обновления скидочной группы --------->', err)
        res.status(400).send('Ошибка обновления скидочной группы.')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await GroupDiscount.findOneAndDelete({ slug: req.params.slug })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления скидочной группы --------->', err)
        res.status(400).send('Ошибка удаления скидочной группы.')
    }
}