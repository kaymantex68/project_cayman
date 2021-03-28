const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { add,list  } = require('../controllers/cart')



router.post("/cart", authCheck, add)
router.post("/cartItems", authCheck, list)

module.exports=router