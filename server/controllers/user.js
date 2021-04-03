const User = require('../models/user')

exports.read = async(req, res)=>{
    const user= await User.findOne({_id: req.params._id}).exec()
    res.json(user)
 }

exports.list = async(req, res)=>{
    const users= await User.find({}).exec()
    res.json(users)
 }