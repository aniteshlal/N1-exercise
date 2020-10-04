const cool = require("cool-ascii-faces");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = "mongodb://anitesh:password1@ds241668.mlab.com:41668/heroku_t9xxzc3q";

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/db", async (req, res) => {
    try {
      const client = await MongoClient.connect(MONGODB_URI);
      const result = await client.db('heroku_t9xxzc3q').collection('test_table').find({}).toArray();
      const results = { results: result };
      res.render("pages/db", results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get("/cool", (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
