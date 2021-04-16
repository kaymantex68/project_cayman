const express = require('express')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const {
    create,
    read,
} = require('../controllers/contacts')


router.post("/contacts", 
authCheck, adminCheck, 
create)
router.get("/contacts",  read)

module.exports = router