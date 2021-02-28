const express = require('express')
const Product =require('../models/product.js')

const router = express.Router()

// import moddlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controllers
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

router.post("/create-or-update-user", authCheck, createOrUpdateUser)
router.post("/current-user", authCheck, currentUser)
router.post("/current-admin", authCheck, adminCheck, currentUser)


//test pruduct create
router.post("/create/product", async (req, res) => {
    try {
        const result = await new Product(
            JSON.parse(JSON.stringify(req.body))
        ).save()
        console.log(result)
        res.json(result)
    } catch(err){
        console.log('error create product', err)
    }
    
})

module.exports = router