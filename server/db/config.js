const mongoose = require("mongoose");
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

   
  // Replace the following with your Atlas connection string                                                                                                                                        
