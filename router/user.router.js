const express = require("express");
const app = express();
const login=require('../controler/user/loginUser');
const userdetails=require('../controler/user/productdetails');
const ordering=require('../controler/user/productorder')
app.disable("x-powered-by");
app.use('',login);
app.use('',userdetails);
app.use('',ordering);

module.exports=app;