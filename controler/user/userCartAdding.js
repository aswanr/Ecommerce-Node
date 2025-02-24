const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const { userauth } = require("../../middleware/loginjwt");
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/:productid/:userid", async (req, res) => {
  const userid = req.params.userid;
  const productid = req.params.productid;
  const quantity = req.body.quantity;
  const q2 = "SELECT products.price FROM products WHERE products.id = ?";

  if (!quantity) {
    return res.status(400).send({ error: "Quantity required" });
  }

  try {
    const [productData] = await db.query(q2, [productid]);

    if (productData.length === 0) {
      return res.status(404).send("Product not found");
    }

    const price = productData[0].price;
    const total_amount = price * quantity;

    const q1 =
      "INSERT INTO ecommerse_db.cart (product_id, user_id, quantity, total_amount, created_time) VALUES (?, ?, ?, ?, ?)";

    await db.query(q1, [productid, userid, quantity, total_amount, new Date()]);

    res.send(`Product added to cart with total amount: ${total_amount}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
