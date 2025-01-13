const express = require("express");
const app = express();
const login=require('../controler/user/loginUser');
const userdetails=require('../controler/user/productdetails')

app.use('',login);
app.use('',userdetails);

module.exports=app;