const express =require('express');
const app=express();
const db = require("../../config/db.conf");
const {userauth} = require('../../middleware/loginjwt');
app.disable("x-powered-by");
app.post('/user/products/ordering',userauth, async (req, res) => {
    const { product_id, order_id, price, quantity,created_time} = req.body;
    const values = [product_id,order_id,price,quantity,created_time];
    const q = 'INSERT INTO ecommerse_db.ordered_item (product_id,order_id,price,quantity,created_time) VALUES (?,?,?,?,?);';
    db.query(q,values, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Database Error" });
        } else {
            res.json({ success: true, data: result });
        }
    });
});


module.exports=app;