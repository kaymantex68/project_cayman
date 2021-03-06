const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { list } = require('../controllers/optimization')


// router.post("/product", authCheck, adminCheck, create)
router.get("/picture-product", list)
// router.get("/product/:slug", read)
// router.put("/product/:_id", authCheck, adminCheck, update)
// router.delete("/product/:_id", authCheck, adminCheck, remove)
// router.post("/productImage", authCheck, adminCheck, upload)
// router.put("/productImage", authCheck, adminCheck, removeImage)

module.exports=router