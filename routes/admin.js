const express = require("express");

const router = express.Router();

const books = [];

// /admin/add-book => GET
router.get("/add-book", (req, res) => {
  res.render("add-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
  });
});

// /admin/add-book => POST
router.post("/add-book", (req, res) => {
  books.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.books = books;
