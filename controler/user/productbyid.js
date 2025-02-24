const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const cors = require("cors");
app.use(cors());
app.disable("x-powered-by");

app.get("/:id", async (req, res) => {
  try {
    const productid = req.params.id;
    const q = "select * from products where id=?";
    const dataResult = await db.query(q, productid);
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
