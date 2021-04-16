const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { 
    create, 
    list,
} = require('../controllers/orderBook')


router.post("/orderBook", 
// authCheck, adminCheck, 
create)
router.post("/orders", 
// authCheck, adminCheck, 
list)
module.exports=router