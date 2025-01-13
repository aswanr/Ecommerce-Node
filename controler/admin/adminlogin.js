const express =require('express');
const app=express();
const db = require("../../config/db.conf");
const jwt = require('jsonwebtoken');
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login/admin',async(req,res) => {
    let qr = "SELECT id,password FROM ecommerse_db.admin WHERE username = ? AND password = ?";
    const username1 = req.body.username;
    const password1 = req.body.password; 
    if (!req.body.username || !req.body.password) {
        return res.status(404).send({ error: "Authentication failed" });
    }   
    if(res.length === 0){
                return res.status(500).send({ error: "Login failed" });
            } 
    else {
            db.query(qr, [username1, password1], (err, result) => {
            if (err || result.length == 0) {
                return res.status(500).send({ error: "user name and password are incorrect" });
            } 
            else{
            const ids = result[0].id;
            const token = jwt.sign({ ids }, process.env.JWT_SECRET_KEY, { expiresIn: 300000 })
            res.status(200).send(token);
        }
        })
    }}); 


module.exports=app;

