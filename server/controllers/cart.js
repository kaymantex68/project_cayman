const Cart = require("../models/cart");
const User = require("../models/user")
const Product = require("../models/product")

exports.add = async (req, res) => {
  try {
    if (req.user.email) {
      const { email } = req.user

      const { cart } = req.body;
      console.group('cart', cart)
      let result = await User.findOneAndUpdate(
        { email },
        {
          "$set": { "cart": cart }
        },
        { new: true }
      );

      console.log(result)
      res.json(result);
    }
    else (
      res.status(400).json({ message: "Время токена истекло, перезагрузите страницу" })
    )

  } catch (err) {
    res.status(400).json({ message: "Время токена истекло, перезагрузите страницу" })
    console.log('err-->', err)
  }
};

exports.list = async (req, res) => {
  const { email } = req.user
  const result = await User.findOne({ email }).exec()
  res.json({ cart: result.cart })
}


exports.listMany = async (req, res)=>{
  try{
      console.log('req.body------------------------------------------',req.body)
      const {products}=req.body
      const result = await Product.find({_id:{"$in":products}}).exec()
      res.json({cart: result})
  }catch(err){
    res.status(400).json({ message: "Время токена истекло, перезагрузите страницу" })
    console.log('err-->', err)
  }
}
