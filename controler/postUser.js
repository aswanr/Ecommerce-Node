const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

crud.post('/post', (req, res) => {
    const { id, first_name, last_name, username, password, email, phone_number, created_time} = req.body;
    const values = [id, first_name, last_name, username, password, email, phone_number, created_time];
    const query="INSERT INTO USER (id,first_name,last_name,username,password,email,phone_number, created_time)VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(query, values, (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).send("Error inserting user");
            } 
            else {
              console.log("User inserted successfully");
              res.send("Done successfully");
            }
          });
        });

module.exports =crud;