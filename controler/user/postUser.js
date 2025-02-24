const express = require("express");
const crud = express();
const db = require("../../config/db.conf");
crud.disable("x-powered-by");
const bcrypt = require("bcrypt");

crud.post("/", async (req, res) => {
  const {
    id,
    first_name,
    last_name,
    username,
    password,
    email,
    phone_number,
    created_time,
  } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);
  const values = [
    id,
    first_name,
    last_name,
    username,
    hashedPassword,
    email,
    phone_number,
    created_time,
  ];
  const query =
    "INSERT INTO USER (id, first_name, last_name, username, password, email, phone_number, created_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    const result = await db.query(query, values);
    console.log("User inserted successfully");
    res.send("Done successfully");
  } catch (err) {
    console.error(err);
    res.status(404).send("Error inserting user");
  }
});

module.exports = crud;
