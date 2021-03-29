const Work = require('../models/work')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name, coast, active } = req.body
        const work = await new Work({ name, slug: slugify(name), coast, active }).save()
        res.json(work)
    } catch (err) {
        console.log('Ошибка создания вида работ --------->', err)
        res.status(400).send('Ошибка создания вида работ!')
    }
}

exports.list = async(req, res)=>{
   const works= await Work.find({}).exec()
   res.json(works)
}

exports.read=async(req, res)=>{
    const work= await Work.findOne({_id: req.params._id}).exec()
    res.json(work)
}

exports.update = async (req, res) => {
    try {
        const { name, coast, active } = req.body
        const result = await Work.findOneAndUpdate(
            { _id: req.params._id },
            { name, slug: slugify(name), coast, active},
            { new: true })
        res.json(result)
    } catch (err) {
        console.log('Ошибка обновления work --------->', err)
        res.status(400).send('Ошибка обновления work!')
    }
}

exports.remove = async (req, res) => {
    try {
        const result = await Work.findOneAndDelete({ _id: req.params._id })
        res.json(result)
    } catch (err) {
        console.log('Ошибка удаления work --------->', err)
        res.status(400).send('Ошибка удаления work.')
    }
}