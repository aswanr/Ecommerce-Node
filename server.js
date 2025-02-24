const express = require("express");
const app = express();
const db = require("./config/db.conf");
const getallUser = require("./controler/getUser");
const updateuser= require("./controler/user/updateUser");
const user=require('./router/user.router')
const admin=require('./router/admin.router')
const {userauth}=require('./middleware/loginjwt')
app.disable('x-powered-by');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', getallUser);
app.use('/', updateuser);
app.use('/',user);
app.use('/',admin);
app.use('/verify',userauth);





const PORT = process.env.PORT;
app.listen(PORT, console.log(`server running on port ${PORT}`));

module.exports = app; 
