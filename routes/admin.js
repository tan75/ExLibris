const express = require("express");

const router = express.Router();

router.get("/add-book", (req, res) => {
  console.log("In another middleware");
  res.send(
    '<form action="/admin/add-book" method="POST"><input type="text" name="title"><button type="submit">Add Book</button></form>'
  );
});

router.post("/add-book", (req, res) => {
  console.log("Got a post request");
  res.redirect("/");
});

module.exports = router;
