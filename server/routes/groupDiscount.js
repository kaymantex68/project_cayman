const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    create,
    remove,
    update,
    read,
    list
} = require('../controllers/groupDiscount')


router.post("/groupDiscount",
    // authCheck, adminCheck, 
    create)
router.get("/groupDiscounts", list)
router.get("/groupDiscount/:slug", read)
router.put("/groupDiscount/:slug",
    // authCheck, adminCheck, 
    update)
router.delete("/groupDiscount/:slug",
    //  authCheck, adminCheck,
    remove)

module.exports = router