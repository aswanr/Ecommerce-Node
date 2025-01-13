const express =require('express');
const app=express();
const db = require("../../config/db.conf");
const {userauth} = require('../../middleware/loginjwt');
app.disable("x-powered-by");
app.post('/user/products',userauth,async(req,res)=>{
    db.query('select * from ecommerse_db.products',(err,result)=>{
        if(err){
            res.send(500).json({message:"Data Base Error"})
        }
        else{
            res.json({ success: true, data: result });
        }
    })
});

module.exports=app;