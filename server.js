const express = require("express");
const app = express();
const db = require("./config/db.conf");
const get = require("./controler/getUser");
const post = require("./controler/postUser");
const  getuser= require("./controler/getUserbyid");
const  updateuser= require("./controler/updateUser");
const  deleteuser= require("./controler/deleteUser");
const user=require('./router/user.router')
const admin=require('./router/admin.router')
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', get);
app.use('/', post);
app.use('/', getuser);
app.use('/', updateuser);
app.use('/', deleteuser);
app.use('/',user);
app.use('/',admin);

const port =process.env.port || 3002;
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

module.exports = app; 
