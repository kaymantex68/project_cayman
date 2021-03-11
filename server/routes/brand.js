const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, remove, update, read, list } = require('../controllers/brand')


router.post("/brand", authCheck, adminCheck, create)
router.get("/brands", list)
router.get("/brand/:_id", read)
router.put("/brand/:_id", authCheck, adminCheck, update)
router.delete("/brand/:_id", authCheck, adminCheck, remove)

module.exports=router