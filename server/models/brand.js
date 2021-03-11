const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
    
      index: true,
      lowercase: true,
    },
    turn: {
      type: Number,
      required: true,
    },
    parent: {
      type: ObjectId,
      required: true,
      ref: "Sub",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
