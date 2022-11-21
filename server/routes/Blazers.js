require("../db/config");
const express = require("express");
//const Men = require("../db/Men");

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const men = query
      db.Blazers .find(
        {}
      )
      res.status(200).json(men);
      res.status(200).send(men);
      console.log(men);
    } catch (err) {
      res.status(500).json(err);
      res.status(500).send(err);
      console.log(err);
    }
  });
