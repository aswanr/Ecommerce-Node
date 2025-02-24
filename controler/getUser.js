const express = require("express");
const crud = express();
const db = require("../config/db.conf");
crud.disable('x-powered-by');

crud.get('/', async(req, res) => {
    try{
    const data=  await db.query("SELECT * FROM USER")
    res.send(data);
    }
    catch(error){
        res.json({message:"Unable get the user"});
        return;
    }
})

module.exports =crud;