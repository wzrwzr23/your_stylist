require("../db/config");
const mongoose = require("mongoose");

const Men = require("../db/Men");
const express = require("express");
//const Men =mongoose.model("Blazers");

const router = express.Router();



// router.post("/", async (re, rs) => {
//   let rt = new Men(re.body);
//   let rl = await rt.save();
//   rs.send(rl);
// });

// router.get("/", (req, res) => {
//     Men.find({}, (err, result) => {
//         if (err) console.log(err);
//         else {
//             console.log("Getting Information...")
//             res.json(result)
//         }
//     })
// })

router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const men = query
        ? await Men.find().sort({ _id: -1 }).limit(5)
        : await Men.find();
      res.status(200).json(men);
      res.status(200).send(men);
      console.log(men);
    } catch (err) {
      res.status(500).json(err);
      res.status(500).send(err);
      console.log(err);
    }
  });

  router.post("/", async (req, res) => {
    const newMen = new Men(req.body);
  
    try {
      const saveMen = await newMen.save();
      res.status(200).json(saveMen);
      res.send(saveMen);
    } catch (err) {
      res.status(500).json(err);
      res.send(err);
    }
  });
 
//app.use(router);

module.exports = router;
