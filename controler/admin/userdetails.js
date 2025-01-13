const express =require('express');
const app=express();
const db = require("../../config/db.conf");
const {adminauth} = require('../../middleware/loginjwt');

app.post('/admin/user',adminauth,async(req,res)=>{
    db.query('select * from ecommerse_db.user',(err,result)=>{
        if(err){
            res.send(500).json({message:"Data Base Error"})
        }
        else{
            res.json({ success: true, data: result });
        }
    })
});

module.exports=app;