require("../db/config");
const express = require("express");
const creditReq = require("../db/Option");
const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new ItemInfo(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

//var router = express.Router();
   
router.get("/", (req, res) => {
    Option.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("Get Option...")
            res.json(result)
        }
    })
})

 
app.use(router);
module.exports = router;
