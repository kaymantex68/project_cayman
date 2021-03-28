const Cart = require("../models/cart");
const User = require("../models/user")

exports.add = async (req, res) => {
  try {
    const { email } = req.user
    const { cart } = req.body;
    console.group('cart', cart)
    let result = await User.findOneAndUpdate(
      { email },
      {
        "$set":{"cart":cart}
      },
      { new: true }
    );
    
    console.log(result)
    res.json(result);
  } catch (err) {
      console.log('err-->', err)
  }
};

exports.list = async(req, res)=>{
    const { email } = req.user
    const result = await User.findOne({email}).exec()
    res.json({cart: result.cart})
}
