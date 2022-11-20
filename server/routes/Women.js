require("../db/config");
const express = require("express");
const Women = require("../db/Women");

const router = express.Router();

//const app = express();

// app.get("/", (req, res) => {
//     Women.find({}, (err, result) => {
//         if (err) console.log(err);
//         else {
//             console.log("Getting Information...")
//             // res.json(result)
//             res.send(result)
//         }
//     })
// })

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
            res.send(result)
        }
    })
})

 
// app.listen(8000, () => {
//     console.log("Server Woman is listening");
//   });




 module.exports = router;
