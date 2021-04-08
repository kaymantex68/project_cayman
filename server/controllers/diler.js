const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const Diler = require("../models/diler");
const ProductPicture = require("../models/productPicture");
require("dotenv").config();
//-------------------------------------------------------- save brand picture start
// create a list in data base
exports.createDiler = async (req, res) => {
  try {
    console.log("-------------brand name-------------");
    console.log(req.body);
    console.log("-------------brand name-------------");
    const { name } = req.body;
    const result = await Diler.findOneAndUpdate(
      { slug: slugify(name) },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (result) {
      res.json(result);
      console.log("-------------result-------------");
      console.log(result);
      console.log("-------------result-------------");
    } else {
      const newResult = await new Diler({
        name,
        slug: slugify(name),
      }).save();
      console.log("-------------result-------------");
      console.log(newResult);
      console.log("-------------result-------------");
      res.json(newResult);
    }
  } catch (err) {
    console.log("-------------create brand picture error-------------");
    console.log(err);
    console.log("-------------create brand picture error-------------");
    return res.status(500).json({ message: "-----create brand error-----" });
  }
};
// create file in folder and update a list to data base
exports.uploadDilerImage = async (req, res) => {
  try {
    const slug = req.headers.name;
    console.log("-------------file-------------");
    console.log(req.files.image.data);
    console.log("-------------file-------------");
    const fileName = `${slug}.${req.files.image.mimetype.split("/")[1]}`;
    await fs.writeFile(
      `${process.env.URI_DILER_PICTURE}/${fileName}`,
      req.files.image.data,
      "binary",
      (err) => {
        if (err) return console.log(err);
      }
    );
    const result = await Diler.findOneAndUpdate(
      { slug },
      { fileName },
      { new: true }
    );
    if (result) {
      console.log("-------------file was saved-------------");
      console.log("The file was saved!");
      console.log("-------------file was saved-------------");
    }
    return res.json({ message: "upload complete" });
  } catch (err) {
    console.log("-------------upload error start-------------");
    console.log(err);
    console.log("-------------upload error end-------------");
    return res.status(500).json({ message: "-----upload error-----" });
  }
};
//-------------------------------------------------------- save brand picture end

exports.getDilerImageInfo = async (req, res) => {
  try {
    const brandInfo = await Diler.findOne({
      name: req.params.name,
    }).exec();
    res.json(brandInfo);
  } catch (err) {
    console.log("-------------get brand picture info error-------------");
  }
};

exports.dilerList = async (req, res) => {
  const result = await Diler.find({}).exec();
  res.json(result);
};

exports.deleteDilerImage = async (req, res) => {
  try {
    
    slug=req.params.slug
    console.log('slug:', slug)
    const result = await Diler.findOneAndDelete({slug: slug})
    console.log('result', result)
    if (result){
        const path = `${process.env.URI_DILER_PICTURE}/${result.fileName}`
        console.log('path', path)
       
        await fs.unlink(path,(err)=>{
            if (err) {
                console.log('-----error delete brand image-----', err);
                // res.json({message:"ошибка удаления логотипа бренда"})
            }
        })
    }
    res.json(result)
  } catch (err) {
    console.log("-------------delete error start-------------");
    console.log(err);
    console.log("-------------delete error end-------------");
    res.status(500).json({ message: "-----delete error-----" });
  }
};
