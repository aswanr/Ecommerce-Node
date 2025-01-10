const express = require("express");
const path=require("path");
const secondrouter = express();
secondrouter.disable('x-powered-by');
secondrouter.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "second.html"));
})

module.exports=secondrouter;