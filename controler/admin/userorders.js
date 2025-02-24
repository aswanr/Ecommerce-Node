const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const { adminauth } = require("../../middleware/loginjwt");
app.disable("x-powered-by");

app.post("/", adminauth, async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM ecommerse_db.order");
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
