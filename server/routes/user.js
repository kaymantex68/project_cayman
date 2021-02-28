const express= require('express')

const router=express.Router()

router.get('/test2',(req,res)=>{
    res.json({message:'user'})
})

module.exports= router