const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    //brand image
    createDiler,
    uploadDilerImage,
    getDilerImageInfo,
    dilerList,
    deleteDilerImage,
   
} = require('../controllers/diler')


router.post("/dilerImage", authCheck, adminCheck, uploadDilerImage)
router.get("/dilers", dilerList)
router.post("/dilerImage/data", authCheck, adminCheck, createDiler)
router.get('/dilerImage/:name', getDilerImageInfo)
router.delete("/dilerImage/:slug", authCheck, adminCheck, deleteDilerImage)

// router.post("/productImage", authCheck, adminCheck, uploadProductImage)
// router.delete("/productImage/:slug", authCheck, adminCheck, deleteProductImage)

// router.get("/subs", list)
// router.get("/sub/:_id", read)
// router.put("/sub/:_id", authCheck, adminCheck, update)
// router.delete("/sub/:_id", authCheck, adminCheck, remove)

module.exports = router