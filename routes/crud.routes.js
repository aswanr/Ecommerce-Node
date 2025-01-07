const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

//get user
crud.get('/', (req, res) => {
    db.query("SELECT * FROM USER", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

//post
crud.post('/post', (req, res) => {
    const { id, first_name, last_name, username, password, email, phone_number, created_time } = req.body;
    
    const query="INSERT INTO USER (id, first_name, last_name, username, password, email, phone_number, created_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id, first_name, last_name, username, password, email, phone_number, created_time];
    db.query(query, values,(err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("connected successfully");
            res.send("Done successfully");
        }
    });

});

// Get element by id
crud.get("/get/:id", (req, res) => {
    const getbyid = req.params.id;
    db.query("SELECT * FROM user WHERE id = ?", getbyid, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            const value = JSON.parse(JSON.stringify(result));
            if (result.length === 0) {
                res.send("Id not founded");
            }
            else {
                res.send(value);
            }
        }
    })
});

//update or edit
crud.put('/useredit/:id', (req, res) => {
    const getbyid = req.params.id;
    const {  first_name, last_name, username, password, email, phone_number, } = req.body;
    const querry='update user set first_name=?,last_name=?,username=?,password=?,email=?,phone_number=? where id=?';
    const values = [first_name,last_name, username, password, email, phone_number, getbyid];
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
})

//delete
crud.delete('/userdelete/:id', (req, res) => {
    const deleteid = req.params.id;
    db.query('delete from user where id=?', deleteid, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            if (result.affectedRows === 0) {
                res.send("Id not founded");
            }
            else {
                console.log("connected successfully");
                res.send(" Deleted successfully ");
            }
        }
    })
})

module.exports =crud;

