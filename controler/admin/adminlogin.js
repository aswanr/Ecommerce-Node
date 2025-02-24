const express = require("express");
const app = express();
const db = require("../../config/db.conf");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Corrected spelling
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async (req, res) => {
  const qr = "SELECT id, password FROM ecommerse_db.admin WHERE username = ?";
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).send({ error: "Username and password required" });
  }

  try {
    const [data] = await db.query(qr, [username]);

    if (data.length === 0) {
      return res.status(401).send({ error: "Login failed" });
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "8h",
      });
      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ error: "Username or password is incorrect" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = app;
