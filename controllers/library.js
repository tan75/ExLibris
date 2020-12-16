const Book = require("../models/book");

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").json({ books });
    })
    .catch((err) => console.log(err));
};

exports.getBook = (req, res) => {
  const bookId = req.params.bookId; // comes from the route
  Book.findById(bookId)
    .then((book) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").json({book})
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").json({books});
    })
    .catch((err) => console.log(err));
};

exports.getReport = (req, res) => {
  req.user
    .getReport()
    .then((reportBooks) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").json({reportBooks});
    })
    .catch((err) => console.log(err));
};

exports.postReport = (req, res) => {
  const bookId = req.body.bookId;
  Book.findById(bookId)
    .then((book) => {
      req.user.addToReport(book);
      res.status(201).headr("Access-Control-Allow-Origin", "*").json({ book });
    })
};