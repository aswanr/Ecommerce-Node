const express = require("express");
const app = express();
const login=require('../controler/user/loginUser');
const userdetails=require('../controler/user/productdetails');
const ordering=require('../controler/user/productorder');
const usercart=require('../controler/user/usercart');
const useradd=require('../controler/user/postUser');
const home=require('../controler/user/UserHome');
const productbyid=require('../controler/user/productbyid')
const serach=require('../controler/user/search');
const cartadding=require('../controler/user/userCartAdding');
app.disable("x-powered-by");

app.use(express.json());
app.use('/login/user',login);
app.use('/user/products',userdetails);
app.use('/user/products/ordering/',ordering);
app.use('/user/usercarts',usercart);
app.use('/user/postuser',useradd);
app.use('/user/home',home);
app.use('/productbyid',productbyid);
app.use('/serach',serach);
app.use('/cart/item',cartadding);

module.exports=app;