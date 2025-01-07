const express = require("express");
const app = express();
const db = require("./config/db.conf");
const crud = require("./routes/crud.routes");
app.disable('x-powered-by');
app.use(express.json());

app.use('/', crud);

const port = process.env.PORT || 3002;
app.listen(port, (err) => {
    if (err) {
        console.log("error");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});

module.exports = app;
