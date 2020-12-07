const Book = require("../models/book");
const mongoDb = require("mongodb");

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      //res.status(200).json({ books });
      res.render("library/book-list", {
        bks: books,
        pageTitle: "All Books",
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

// http://localhost:8000/books/5f97477af8cb963cd355519b
exports.getBook = (req, res) => {
  const bookId = req.params.bookId; // comes from the route
  Book.findById(bookId)
    .then((book) => {
      console.log(book);
      res.status(200).json({book})
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.status(200).json({books});
    })
    .catch((err) => console.log(err));
};

// http://localhost:8000/report
exports.getReport = (req, res) => {
  req.user
    .getReport()
    .then((reportBooks) => {
      res.status(200).json({reportBooks});
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
      res.redirect("/report")
      // res.json({
      //   message: 'Book Added to the Report',
      //   book: {_id: new mongoDb.ObjectID(bookId), title: req.bod.title, pages: req.body.pages}  })       
        .catch((err) => console.log(err));
    })
};