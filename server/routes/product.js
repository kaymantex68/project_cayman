const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, list } = require('../controllers/product')


router.post("/product", authCheck, adminCheck, create)
router.get("/products", list)
// router.get("/sub/:_id", read)
// router.put("/sub/:_id", authCheck, adminCheck, update)
// router.delete("/sub/:_id", authCheck, adminCheck, remove)

module.exports=router