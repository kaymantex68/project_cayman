
const {readdirSync} = require("fs");

exports.list = async (req, res) => {
    try {
        let pictures=[]
        readdirSync(`${process.env.URI_PRODUCT_PICTURE}`).map(i=>{
            // console.log(i)
            pictures.push(i)
        })

        res.json({ pictures: pictures })
    } catch (err) {
        console.log('Ошибка запроса картинок из каталога --------->', err)
        res.status(400).send('Ошибка запроса картинок из каталога')
    }
}
