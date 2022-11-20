require("../db/config");
const express = require("express");
const Women = require("../db/Women");

const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new Women(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

router.get("/", (req, res) => {
    Women.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("Getting Information...")
            res.json(result)
        }
    })
})

 
app.use(router);

module.exports = router;
