const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const { userauth } = require("../../middleware/loginjwt");
app.disable("x-powered-by");

app.post("/:userId/:productId", userauth, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  const q1 = "SELECT price FROM ecommerse_db.products where id=?";
  try {
    const [data] = await db.query(q1, [productId]);
    const price = data[0].price;
    const { dateof_order, quantity } = req.body;
    const values = [userId, price, productId, dateof_order, quantity];
    try {
      const q =
        "INSERT INTO ecommerse_db.order(user_id,price,product_id,dateof_order,quantity) VALUES (?,?,?,?,?)";
      const data2 = await db.query(q, values);
      res.json({ success: true, data: data2 });
    } catch (error) {
      return res.status(500).json({ message: "data error" });
    }
  } catch (error) {
    return res.status(500).json({ message: "data error" });
  }
});

module.exports = app;
