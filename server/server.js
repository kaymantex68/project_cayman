const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const {readdirSync} = require("fs");
const fileUpload = require('express-fileupload')
require("dotenv").config();

// app
const app = express();

// mongoose
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
   
  })
  .then(() => console.log("DB connected OK"))
  .catch((err) => console.log(`DB error connect ${err}`));

// middlewares
// file upload , while i don now what is that!!
app.use(fileUpload({}))
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());



app.get('/api', (req, res) => {
    res.send('we here')
})
// connect routers
readdirSync('./routes').map((route)=>app.use(`/api`,require(`./routes/${route}`)))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});