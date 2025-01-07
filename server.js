const express = require("express");
const app = express();
const db = require("./config/db.conf");
const crud = require("./routes/crud.routes");
app.disable('x-powered-by');
app.use(express.json());


app.use('/', crud);

const port = process.env.port || 3001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
  });
}

module.exports = app; 