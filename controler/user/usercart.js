const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const { userauth } = require("../../middleware/loginjwt");
app.disable("x-powered-by");

app.post("/:userId", userauth, async (req, res) => {
  const userId = req.params.userId;
  const q1 = "SELECT * from cart where user_id=?";
  try {
    const [data] = await db.query(q1, userId);
    if (data.affectedRows === 0) {
      res.json({ message: "The Cart is empty" });
    } else {
      res.json({ message: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

module.exports = app;
