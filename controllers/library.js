const Book = require("../models/book");

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.json({books});
    })
    .catch((err) => console.log(err));
};

// http://localhost:8000/books/5f97477af8cb963cd355519b
exports.getBook = (req, res) => {
  const bookId = req.params.bookId; // comes from the route
  Book.findById(bookId)
    .then((book) => {
      res.json({book})
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.json({books});
    })
    .catch((err) => console.log(err));
};

exports.getReport = (req, res) => {
  req.user
    .getReport()
    .then((reportBooks) => {
      res.render("library/report", {
        path: "/report",
        pageTitle: "Your Reading Report",
        books: reportBooks,
        totalPages: req.user.report.totalPages,
      });
    })
    .catch((err) => console.log(err));
};

exports.postReport = (req, res) => {
  const bookId = req.body.bookId;
  Book.findById(bookId)
    .then((book) => {
      return req.user.addToReport(book);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/report");
    })
    .catch((err) => console.log(err));
};
