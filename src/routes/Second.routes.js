const express = require("express");
const path=require("path");
const secondrouter = express();

secondrouter.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, "../routerpages", "second.html"));
})

module.exports=secondrouter;