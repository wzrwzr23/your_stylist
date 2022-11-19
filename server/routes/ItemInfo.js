require("../db/config");
const express = require("express");
const ItemInfo = require("../db/ItemInfo");
const creditReq = require("../db/ItemInfo");
const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new ItemInfo(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

router.get("/", (req, res) => {
    ItemInfo.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("Getting Information...")
            res.json(result)
        }
    })
})

 
app.use(router);

module.exports = router;
