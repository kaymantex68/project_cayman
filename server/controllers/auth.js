const User = require('../models/user')

exports.createOrUpdateUser = async (req,res)=>{
    const { name, picture, email} = req.user
    const user = await User.findOneAndUpdate({email}, {name, picture}, {new: true})

    if (user) {
        res.json(user)
        console.log('пользователь обновлен ', user)
    }
    else {
        const newUser =await new User({
            email,
            name: name || email.split('@')[0],
            picture
        }).save()
        res.json(newUser)
        console.log('создан новый пользователь ', newUser)
    }
}

exports.currentUser = async( req, res)=>{
    const {email} = req.user
    await User.findOne({email}).exec((err, user)=>{
        if(err) throw new Error(err)
        res.json(user)
        console.log('пользователь найден')
    })
   
}