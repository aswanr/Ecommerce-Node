const express = require("express");
const crud = express();
const { adminauth } = require("../../middleware/loginjwt");
const db = require("../../config/db.conf");
crud.disable("x-powered-by");

crud.get("/:id", adminauth, async (req, res) => {
  const getbyid = req.params.id;
  try {
    const data = await db.query("SELECT * FROM user WHERE id = ?", getbyid);
    if (data[0].length == 0) {
      res.json({ message: "ID does not exist" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.json({ message: "Does not found the user" });
  }
});

module.exports = crud;
