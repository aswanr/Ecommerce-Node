const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerse_db",
})

app.get('/', (req, res) => {
    db.query("select * from cart", (err, result) => {
        if (err) {
            console.log(`unfounded ${err}`);
            return;
        }
        res.json(result);
    });

});

app.get('/first', (req, res) => {
    res.sendFile(path.join(__dirname, "./routerpages", "first.html"));
})

app.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, "./routerpages", "second.html"));
})

const port=process.env.port || 3001;

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
