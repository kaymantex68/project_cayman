const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { uploadImage } = require('../controllers/uploadImages')


router.post("/brandImage", authCheck, adminCheck, uploadImage)
// router.get("/subs", list)
// router.get("/sub/:_id", read)
// router.put("/sub/:_id", authCheck, adminCheck, update)
// router.delete("/sub/:_id", authCheck, adminCheck, remove)

module.exports=router