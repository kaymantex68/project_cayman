const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, remove, update, read, list, listSlug } = require('../controllers/sub')


router.post("/sub", authCheck, adminCheck, create)
router.get("/subs", list)
router.get("/subsSlug/:slug", listSlug)
router.get("/sub/:_id", read)
router.put("/sub/:_id", authCheck, adminCheck, update)
router.delete("/sub/:_id", authCheck, adminCheck, remove)

module.exports=router

