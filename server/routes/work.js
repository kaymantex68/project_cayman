const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    create,
    list,
    read,
    update,
    remove,
} = require('../controllers/work')


router.post("/work",
    authCheck, adminCheck,
    create)
router.get("/works", list)
router.get("/work/:slug", read)
router.put("/work/:_id",
    authCheck, adminCheck,
    update)
router.delete("/work/:_id",
    authCheck, adminCheck, 
    remove)

module.exports = router