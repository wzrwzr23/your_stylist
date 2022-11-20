require("../db/config");
const express = require("express");
const WishList = require("../db/WishList");

const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new WishList(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

router.get("/", (req, res) => {
    WishList.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("Getting Information...")
            res.json(result)
        }
    })
})

 
//app.use(router);

module.exports = router;
