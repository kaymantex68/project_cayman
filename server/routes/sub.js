const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, remove, update, read, list } = require('../controllers/sub')


router.post("/sub", authCheck, adminCheck, create)
router.get("/subs", list)
router.get("/sub/:_id", read)
router.put("/sub/:_id", authCheck, adminCheck, update)
router.delete("/sub/:slug", authCheck, adminCheck, remove)

module.exports=router