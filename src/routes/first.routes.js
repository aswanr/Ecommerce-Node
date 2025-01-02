const express = require("express");
const path=require("path");
const firstrouter = express();

firstrouter.disable('x-powered-by');
firstrouter.get('/first', (req, res) => {
    res.sendFile(path.join(__dirname,"../routerpages", "first.html"));
})

module.exports =firstrouter;
