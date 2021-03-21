const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { list,listCategory,listBrand,  } = require('../controllers/catalog')



router.get("/catalog", list)
router.get("/catalog/:category", listCategory)
// router.get("/catalog/:category/:sub", )
// router.get("/catalog/:category/:sub/:brand", listBrand)
// router.get("/product/:slug", read)
// router.put("/product/:_id", authCheck, adminCheck, update)
// router.delete("/product/:_id", authCheck, adminCheck, remove)
// router.post("/productImage", authCheck, adminCheck, upload)
// router.put("/productImage", authCheck, adminCheck, removeImage)
// router.delete("/unusedImages/:fileName", authCheck, adminCheck, removeUnusedImages)
module.exports=router