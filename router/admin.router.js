const express = require("express");
const app = express();
const login=require('../controler/admin/adminlogin');
const userdetails=require('../controler/admin/userdetails')
app.disable("x-powered-by");
app.use('',login);
app.use('',userdetails);

module.exports=app;