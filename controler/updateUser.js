const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

crud.put('/useredit/:id', (req, res) => {
    const getbyid = req.params.id;
    const {  first_name, last_name, username,email, phone_number, } = req.body;
    const querry='update user set first_name=?,last_name=?,username=?,email=?,phone_number=? where id=?';
    const values = [first_name,last_name, username,email, phone_number, getbyid];
    db.query(querry,values,(error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
            if (result.affectedRows === 0) {
                res.send("Id not founded");
            }
            else {
                console.log("connected successfully");
                res.send(" Updated successfully ");
            }
        }
    })
});

module.exports =crud;