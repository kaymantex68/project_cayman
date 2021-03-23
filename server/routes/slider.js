const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, read, list, remove } = require('../controllers/slider')


router.post("/slider", authCheck, adminCheck, create)
router.get("/slide/:slug", read)
router.get("/slides", list)
// router.get("/subsSlug/:slug", listSlug)
// router.get("/sub/:_id", read)
// router.put("/sub/:_id", authCheck, adminCheck, update)
router.delete("/slider/:slug", authCheck, adminCheck, remove)

module.exports = router