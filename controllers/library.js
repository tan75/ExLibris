const Book = require("../models/book");
const Report = require("../models/report");

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.render("library/book-list", {
        bks: books,
        pageTitle: "All Books",
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBook = (req, res) => {
  const bookId = req.params.bookId; // comes from the route
  Book.findById(bookId)
    .then((book) => {
      res.render("library/book-detail", {
        book: book,
        pageTitle: book.title,
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.render("library/index", {
        bks: books,
        pageTitle: "Home",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getReport = (req, res) => {
  Report.fetchAll()
    .then((reportBooks) => {
      res.render("library/report", {
        path: "/report",
        pageTitle: "Your Reading Report",
        books: reportBooks,
      });
    })
    .catch((err) => console.log(err));
};

exports.postReport = (req, res) => {
  const bookId = req.body.bookId;
  Book.findById(bookId)
    .then((book) => {
      console.log("123 req.user ", req.user);
      return req.user.addToReport(book);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.redirect("/report");
};
