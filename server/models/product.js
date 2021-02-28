const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Product', ProductSchema)