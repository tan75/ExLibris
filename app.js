const http = require("http");
const bodyParser = require("body-parser");

const express = require("express");

const app = express();

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/add-book", (req, res, next) => {
  console.log("In another middleware");
  res.send(
    '<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Add Book</button></form>'
  );
});

app.post("/book", (req, res, next) => {
  console.log("Got a post request");
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("In another middleware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
