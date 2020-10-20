const Book = require("../models/book");

exports.getBooks = (req, res) => {
  Book.fetchAll((books) => {
    res.render("library/book-list", {
      bks: books,
      pageTitle: "All Books",
      path: "/books",
    });
  });
};

exports.getIndex = (req, res) => {
  Book.fetchAll((books) => {
    res.render("library/index", {
      bks: books,
      pageTitle: "Home",
      path: "/",
    });
  });
};

exports.getReport = (req, res) => {
  res.render("library/report", {
    path: "/report",
    pageTitle: "Your Report",
  });
};
