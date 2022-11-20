require("../db/config");
const express = require("express");
const Men = require("../db/Men");

const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new Men(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

router.get("/", (req, res) => {
    Men.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("Getting Information...")
            res.json(result)
        }
    })
})

 
app.use(router);

module.exports = router;
