const User = require('../models/user')



exports.list = async(req, res)=>{
    const users= await User.find({}).exec()
    res.json(users)
 }