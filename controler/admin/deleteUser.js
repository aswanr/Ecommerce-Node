const express = require("express");
const crud = express();
const { adminauth } = require("../../middleware/loginjwt");
const db = require("../../config/db.conf");
crud.disable("x-powered-by");

crud.delete("/:id", adminauth, async (req, res) => {
  const deleteid = req.params.id;
  try {
    const data = await db.query("delete from user where id=?", deleteid);
    if (data[0].affectedRows === 0) {
      res.send("Id not founded");
    } else {
      res.json({ message: "deleted sucess fully" });
    }
  } catch (error) {
    res.json({ message: "cannot delete the user" + error });
  }
});
module.exports = crud;
