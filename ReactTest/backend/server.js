const express = require('express');
const http = require('http');
const app = express();
const user = require("./user");
const fans = require("./fans");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/users", user);
app.use("/api/fans", fans);

const port = process.env.PORT || 4200;

app.set('port', port);

console.log("Server is up and running!");

const server = http.createServer(app);

server.listen(port);
