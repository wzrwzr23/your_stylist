
require("./db/config");
const express = require("express");
const app = express();

const cors = require("cors");
const ItemInfo = require("./db/ItemInfo");


app.use(express.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use("/SendItemInfo", ItemInfo);

