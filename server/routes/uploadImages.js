const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    //brand image
    createBrand,
    uploadBrandImage,
    getBrandImageInfo,
    brandList,
    deleteBrandImage,
    // product image
    uploadProductImage,
    deleteProductImage,
} = require('../controllers/uploadImages')


router.post("/brandImage", authCheck, adminCheck, uploadBrandImage)
router.get("/brandImages", brandList)
router.post("/brandImage/data", authCheck, adminCheck, createBrand)
router.get('/brandImage/:name', getBrandImageInfo)
router.delete("/brandImage/:slug", authCheck, adminCheck, deleteBrandImage)

router.post("/productImage", authCheck, adminCheck, uploadProductImage)
router.delete("/productImage/:slug", authCheck, adminCheck, deleteProductImage)

// router.get("/subs", list)
// router.get("/sub/:_id", read)
// router.put("/sub/:_id", authCheck, adminCheck, update)
// router.delete("/sub/:_id", authCheck, adminCheck, remove)

module.exports = router