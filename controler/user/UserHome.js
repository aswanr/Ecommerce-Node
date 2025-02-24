const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const { userauth } = require("../../middleware/loginjwt");

app.disable("x-powered-by");

app.get("/", userauth, async (req, res) => {
  try {
    const userId = req.user.id;  

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const [userDetails] = await db.query("SELECT first_name FROM ecommerse_db.user WHERE id = ?", [userId]);

    if (userDetails.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const [products] = await db.query("SELECT * FROM ecommerse_db.products");

    res.json({ success: true, user: userDetails[0], products });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = app;
