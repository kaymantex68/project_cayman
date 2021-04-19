const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    create,
    list,
    remove,
    update,
} = require('../controllers/orderBook')


router.post("/orderBook",
    authCheck,
    create)
router.post("/orders",
    authCheck,
    adminCheck,
    list)
router.put("/order/:_id",
    // authCheck, adminCheck, 
    update)
router.delete("/order/:_id",
    authCheck, adminCheck,
    remove)


module.exports = router