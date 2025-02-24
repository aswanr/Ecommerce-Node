const express = require("express");
const app = express();
const db = require("../../config/db.conf");
// const { userauth } = require('../../middleware/loginjwt');
const cors = require("cors");
app.use(cors());
app.disable("x-powered-by");

app.get("/", async (req, res) => {
  try {
    const dataResult = await db.query("SELECT * FROM ecommerse_db.products");
    res.json({
      success: true,
      data: dataResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
