const { auth } = require('../firebase')
const admin = require('../firebase')
const User = require('../models/user')

// first we check validate user 
exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
    }
    catch (err) {
        res.status(401).json({ message: "ошибка записи или неверный token" })
    }
    next()
}

exports.adminCheck = async (req, res, next) => {
        const {email}= req.user
        const adminUser = await User.findOne({ email }).exec()
        if (adminUser.role !== 'admin') {
            res.json({
                err: 'Права администратора не доступны'
            })
        } else {
            next()
        }
}