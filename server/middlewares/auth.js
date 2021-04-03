const { auth } = require('../firebase')
const admin = require('../firebase')
const User = require('../models/user')

// first we check validate user 
exports.authCheck = async (req, res, next) => {
    try {
        console.log('we here')
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        console.log('-----------------------------------')
        console.log(firebaseUser)
        console.log('-----------------------------------')
        req.user = firebaseUser
    }
    catch (err) {
        res.status(401).send("Ошибка записи или неверный token! Перезагрузите страницу!" )
        console.log('error middleware--------------------->\n', err)
        console.log('--------------------------------------')
    }
    next()
}

exports.adminCheck = async (req, res, next) => {
        const {email}= req.user
        const adminUser = await User.findOne({ email }).exec()
        if (adminUser.role !== 'admin') {
            res.status(401).send("Права Администратора недоступны!!!" )
        } else {
            next()
        }
}