const express = require("express");
const app = express();
const db = require("../../config/db.conf");
app.disable("x-powered-by");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const { names } = req.body;
  try {
    const q1 = "SELECT name FROM ecommerse_db.products WHERE name LIKE ?";
    const productResult = await db.query(q1, [`${names}%`]);
    const q2 = "SELECT name FROM ecommerse_db.category WHERE name LIKE ?";
    const categoryResult1 = await db.query(q2, [`${names}%`]);

    if (productResult[0][0] !== undefined) {
      res.json({
        success: true,
        productData: productResult,
      });
    } else if (categoryResult1[0][0] !== undefined) {
      res.json({
        success: true,
        productData: productResult,
      });
    } else {
      res.json({
        success: false,
        productData: "Nothing founded",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
