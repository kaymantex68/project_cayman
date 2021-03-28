const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    createdBy: {
        type: ObjectId,
        ref: 'User',
    },
    products: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
