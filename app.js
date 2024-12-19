const cors = require("cors");
const express = require("express");

const config = require("./config");
const User = require("./routes/user.routes");
const Book = require("./routes/book.routes");

const app = express();

const options = {
  origin: "*",
  credentials: true,
};

app.use(cors(options));
app.use(express.json());

app.use(config.routePrefix + "/user", User);
app.use(config.routePrefix + "/books", Book);
app.use("*", (req, res) => {
  res.status(200).end("Api is available.");
});

module.exports = app;
