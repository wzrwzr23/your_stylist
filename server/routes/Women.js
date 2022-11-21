//const Women= 
//require("../db/config");
const express = require("express");
//const { default: mongoose } = require("mongoose");
//const WomenModel = require("../db/Women");
//const { db } = require("../db/Men");
//const Women = require("../db/Women"); 
//const Women = require("../db/Women");
//const Women=mongoose.model(Women).collection
//const config = require("../db/config");
//const db=config.

//const Women = mongoose.connect("mongodb://yuehengggg:1004866wyh1103A@ac-dtwqfjg-shard-00-00.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-01.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-02.59vtveq.mongodb.net:27017/?ssl=true&replicaSet=atlas-otyugf-shard-0&authSource=admin&retryWrites=true&w=majority")
//const Women =mongoose.connection.db('Women')

//const db = require("../db/config");s

const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yuehengggg:1004866wyh1103A@stylist.59vtveq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const dbo = client.db('Women')
    const collection = client.db("Women").collection("Blouse");
  // perform actions on the collection object
    console.log("Connected to database");
    router.post("/", async (re, rs) => {
        let rt = new collection(re.body);//
        let rl = await rt.save();
        rs.send(rl);
    });
    
    router.get("/", (req, res) => {
        // collection.find({}, function (err, docs) {
        //     console.log(docs)
        //     res.send(docs)
        //    });
        // dbo.collection("Blouse").find({}, (err, docs) =>{
        //     console.log(docs)
        //     res.send(docs)
        //    });
            dbo.collection("Blouse").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);})
            // res.send(result)
       // res.send("1");
    })
    module.exports = router;
    
  client.close();
});

// router.post("/", async (re, rs) => {
//   let rt = new Women(re.body);//
//   let rl = await rt.save();
//   rs.send(rl);
// });

// router.get("/", (req, res) => {
//     Women.find({}, function (err, docs) {
//         console.log(docs)
//         res.send(docs)
//        });
// })

 

