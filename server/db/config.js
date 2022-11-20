/*const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://yuehengggg:1004866wyh1103A@ac-dtwqfjg-shard-00-00.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-01.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-02.59vtveq.mongodb.net:27017/?ssl=true&replicaSet=atlas-otyugf-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
  */

  const { MongoClient, ServerApiVersion } = require('mongodb');
  /*const uri = "mongodb+srv://yuehengggg:1004866wyh1103A@stylist.59vtveq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
  const { MongoClient } = require("mongodb");
  */
   
  // Replace the following with your Atlas connection string                                                                                                                                        
  const url = "mongodb://yuehengggg:1004866wyh1103A@ac-dtwqfjg-shard-00-00.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-01.59vtveq.mongodb.net:27017,ac-dtwqfjg-shard-00-02.59vtveq.mongodb.net:27017/?ssl=true&replicaSet=atlas-otyugf-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = new MongoClient(url);
  async function run() {
      try {
            await client.connect();
            console.log("Connected correctly to server");
          
            const db = client.db("Women");
            //const coll = db.collection("Clothes");  

      } catch (err) {
          console.log(err.stack);
      }
      finally {
          await client.close();
      }
  }
  run().catch(console.dir);