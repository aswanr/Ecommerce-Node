const express = require("express");
const expr = express();
const mysql=require("mysql2");
const path=require("path");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"7170aswan",
    database:"ecommerse_db",
})

expr.get('/',(req,res)=>{
        db.query("SELECT * from cart",(err,result) =>{
            if(err){
                console.log(`unfounded ${err}`);
                return;
            }
            res.json(result);
        });

    });
expr.get('/first',(req,res)=>{
    res.sendFile(path.join(__dirname,"./routers","first.html"));
})
expr.get('/second',(req,res)=>{
    res.sendFile(path.join(__dirname,"./routers","second.html"));
})

const port=process.env.port || 3001;

expr.listen(port,()=>{
    console.log(`Server running on Port ${port}`);
})

