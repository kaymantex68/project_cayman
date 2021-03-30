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
    add,
    listWorks
} = require('../controllers/work')


router.post("/work",
    authCheck, adminCheck,
    create)
router.post("/addWork",
    authCheck, adminCheck,
    add)
router.get("/works", list)
router.get("/work/:slug", read)
router.put("/work/:_id",
    authCheck, adminCheck,
    update)
router.delete("/work/:_id",
    authCheck, adminCheck, 
    remove)
router.post("/workItems", authCheck, listWorks)


module.exports = router