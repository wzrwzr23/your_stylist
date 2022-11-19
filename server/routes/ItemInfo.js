require("../db/config");
const express = require("express");
const creditReq = require("../db/ItemInfo");
const router = express.Router();

router.post("/", async (re, rs) => {
  let rt = new ItemInfo(re.body);
  let rl = await rt.save();
  rs.send(rl);
});

module.exports = router;
