const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { 
    create, 
    list , 
    read, 
    update, 
    remove, 
    upload, 
    removeImage, 
    removeUnusedImages, 
    listCategoryAndSub,
    productsFilter
} = require('../controllers/product')


router.post("/product", authCheck, adminCheck, create)
router.get("/products", list)
router.post("/productsCategorySub",listCategoryAndSub)
router.post("/productsFilter",productsFilter)
router.get("/product/:slug", read)
router.put("/product/:_id", authCheck, adminCheck, update)
router.delete("/product/:_id", authCheck, adminCheck, remove)
router.post("/productImage", authCheck, adminCheck, upload)
router.put("/productImage", authCheck, adminCheck, removeImage)
router.delete("/unusedImages/:fileName", authCheck, adminCheck, removeUnusedImages)
module.exports=router


