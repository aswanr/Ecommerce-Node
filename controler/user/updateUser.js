const express = require("express");
const crud = express();
const { userauth } = require("../../middleware/loginjwt");
const db = require("../../config/db.conf");
crud.disable("x-powered-by");

crud.put("/useredit/:id", userauth, async (req, res) => {
  const getbyid = req.params.id;
  const { first_name, last_name, username, email, phone_number } = req.body;
  const querry =
    "update user set first_name=?,last_name=?,username=?,email=?,phone_number=? where id=?";
  const values = [
    first_name,
    last_name,
    username,
    email,
    phone_number,
    getbyid,
  ];
  try {
    const data = await db.query(querry, values);
    if (data[0].affectedRows == 0) {
      res.json({ message: "ID does not exist" });
    } else {
      console.log("connected successfully");
      res.send("Updated successfully");
    }
  } catch (error) {
    res.json({ message: "data base error" });
  }
});

module.exports = crud;
