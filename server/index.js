
require("./db/config");
const express = require("express");
const app = express();

const cors = require("cors");
//const ItemInfo = require("./db/Women");
const Women = require("./routes/Women");
const Men = require("./routes/Men");
const WishList = require("./routes/WishList");

//const config=require("server/config");

//const expressLayouts = require('express-ejs-layouts');

app.use(express.json());
app.use(cors())

//app.set('view engine', 'ejs');
//app.use(expressLayouts);

app.use("/WomenInfo",Women);
app.use("/MenInfo", Men);
app.use("/WishListInfo", WishList);



app.listen(3000, () => {
    console.log("Server is listening");
  });


/*app.get('/', function (req, res) {
    res.render('home', {});
  });*/







