const express = require("express");

const router = express.Router();

router.get("/add-book", (req, res) => {
  console.log("In another middleware");
  res.send(
    '<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Add Book</button></form>'
  );
});

router.post("/book", (req, res) => {
  console.log("Got a post request");

  for (let j = 0; j < 5; j++) {
    console.log(j);
  }
  res.redirect("/");
});

module.exports = router;
