const Sub = require('../models/sub')
const slugify = require('slugify')
const fs = require('fs')
const path=require('path')

exports.uploadImage = async (req, res) => {
    try {
        // const file = req.files
        // fs.writeFile(`test.png`,file, {encoding: 'binary'},(err)=>{
            console.log('-------------file-------------')
            console.log(req.files)
            console.log('-------------file-------------')
            // res.json({message: 'file save'})
        // })
        
        fs.writeFile(`${req.files.image.name}`, req.files.image.data, "binary", (err) => {
            if (err) return console.log(err);
            console.log("The file was saved!");
        });
        return res.json({message: 'complite'})

    } catch (err) {
        console.log('-------------upload error start-------------')
        console.log(err)
        console.log('-------------upload error end-------------')
        return res.status(500).json({ message: '-----upload error-----' })
    }
}