const express = require("express");
const app = express();
const db = require("./config/db.conf");
const get = require("./controler/getUser");
const post = require("./controler/postUser");
const  getuser= require("./controler/getUserbyid");
const  updateuser= require("./controler/updateUser");
const  deleteuser= require("./controler/deleteUser");
app.disable('x-powered-by');
app.use(express.json());


app.use('/', get);
app.use('/', post);
app.use('/', getuser);
app.use('/', updateuser);
app.use('/', deleteuser);

const port =3001;
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
module.exports = app; 