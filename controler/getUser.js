const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

crud.get('/', (req, res) => {
    db.query("SELECT * FROM USER", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

module.exports =crud;