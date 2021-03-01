const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { create, remove, update, read, list } = require('../controllers/category')


router.post("/category", authCheck, adminCheck, create)
router.get("/categories", list)
router.get("/category/:slug", read)
router.put("/category/:slug", authCheck, adminCheck, update)
router.delete("/category/:slug", authCheck, adminCheck, remove)

module.exports=router