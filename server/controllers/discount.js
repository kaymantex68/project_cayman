
const User = require('../models/user')


exports.add = async (req, res) => {
    try {
    //   if (req.user.email) {
        // const { email } = req.user
        // console.log('req.body', req.body)
        const { discount } = req.body;
        // console.log('we here-----')
        console.group('discount', discount)
        let result = await User.findOneAndUpdate(
          { _id: req.params._id },
          {
            "$set": { "discounts": discount }
          },
          { new: true }
        );
  
        console.log(result)
        res.json(result);
  
    } catch (err) {
      res.status(400).json({ message: "Время токена истекло, перезагрузите страницу" })
      console.log('err-->', err)
    }
  };

//   exports.list = async (req, res) => {
//     // const { email } = req.user
//     const result = await User.findOne({ _id: req.params._id }).exec()
//     res.json({ discount: result.discounts })
//   }