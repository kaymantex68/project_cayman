const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { add, list, listMany } = require('../controllers/cart')



router.post("/cart", authCheck, add)
router.post("/cartItems", authCheck, list)
router.post("/cartItemsMany",
    // authCheck, 
    listMany)

module.exports = router