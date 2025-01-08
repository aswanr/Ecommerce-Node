const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

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

module.exports =crud;