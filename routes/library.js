const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  const books = adminData.books;
  res.render("library", {
    bks: books,
    pageTitle: "Library",
    path: "/",
    hasBooks: books.length > 0,
  });
});

module.exports = router;
