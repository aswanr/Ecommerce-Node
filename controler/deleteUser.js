const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

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
