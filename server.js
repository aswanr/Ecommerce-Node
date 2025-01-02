const express = require("express");
const app = express();
const db= require("./src/config/db.conf");
const firstrouter=require("./src/routes/first.routes");
const secondrouter=require("./src/routes/Second.routes");
app.disable('x-powered-by');
app.get('/', (req, res) => {
    db.query("select * from cart", (err, result) => {
        if (err) {
            console.log(`unfounded ${err}`);
            return;
        }
        res.json(result);
    });
});

app.use('/',firstrouter);
app.use('/',secondrouter);

const port=process.env.port || 3001;

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
