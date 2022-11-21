const router = require("routes/Men");
//const path= 
const code = 100003070>200216733;
const express = require('express')

//const info =
const https = require('https');
const url = "http://api.lamysolution.com:7001/aliexpress/findproducts"
https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
    router
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
