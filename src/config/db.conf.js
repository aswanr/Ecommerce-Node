const mysql = require("mysql2");
const dotenv = require('dotenv'); 
dotenv.config();

const db = mysql.createConnection({
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
})

module.exports=db;
