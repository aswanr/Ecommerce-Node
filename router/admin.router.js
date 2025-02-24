const express = require("express");
const app = express();
const login=require('../controler/admin/adminlogin');
const userdetails=require('../controler/admin/userdetails');
const userorders=require('../controler/admin/userorders');
const deleteuser=require('../controler/admin/deleteUser');
const getuser=require('../controler/admin/getUserbyid');
app.disable("x-powered-by");
app.use('/login/admin',login);
app.use('/admin/userdetail',userdetails);
app.use('/admin/userorders',userorders);
app.use('/admin/userdelete',deleteuser);
app.use('/get/userid',getuser);

module.exports=app;