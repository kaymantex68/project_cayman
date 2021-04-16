const Contacts = require('../models/contacts')

exports.create = async (req, res)=>{
    try{
        const {adress, contacts, info}= req.body.contacts
        
        let result = await Contacts.findOneAndUpdate({position: 1}, {adress, contacts, info},{new: true})
        if (!result){
             result= await new Contacts({adress, contacts, info}).save()
        }
        res.json(result)
    }catch(err){
        console.log('Ошибка создания/изменения контактов --------->', err)
        res.status(400).send('Ошибка создания/изменения контактов')
    }
}

exports.read = async (req, res) => {
    const contacts = await Contacts.findOne({ position: 1 }).exec()
    res.json( contacts )
}