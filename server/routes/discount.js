const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    add,
    list,
} = require('../controllers/discount')


// router.post("/work",
//     authCheck, adminCheck,
//     create)
router.post("/addUserDiscount/:_id",
    authCheck, adminCheck,
    add)

// router.get("/work/:slug", read)
// router.put("/work/:_id",
//     authCheck, adminCheck,
//     update)
// router.delete("/work/:_id",
//     authCheck, adminCheck, 
//     remove)
// router.post("/workItems", authCheck, listWorks)


module.exports = router