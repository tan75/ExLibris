const Book = require("../models/book");
const AppError = require("../models/appError");
//const mongodb = require("mongodb");

exports.getAddBook = (req, res) => {
  res.json({});
};

exports.postAddBook = (req, res, next) => {
  // req.query.edit - coming from the view => the name attribute of input tag
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;

  const book = new Book(
    title,
    //() => {}, // title for testing constructor
    pages,
    description,
    imageUrl,
    null,
    req.user._id
  );

  book
    .save()
    .then(() => {
      res.status(201).json({ book });
    })
    .catch((err) => console.log(err));
}; // end postAddBook

exports.getEditBook = (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then((book) => res.json({ book }))
    .catch((err) => console.log(err));
};

exports.postEditBook = (req, res) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedPages = req.body.pages;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const book = new Book(
    updatedTitle,
    updatedPages,
    updatedDescription,
    updatedImageUrl,
    //new mongodb.ObjectID(bookId)
    bookId
  );

  book
    .save()
    .then(() => {
      res.status(200).json({bookId})
    })
    .catch((err) => console.log(err));
};

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.status(200).json({ books });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteBook = (req, res) => {
  const bookId = req.body.bookId;
  Book.deleteById(bookId)
    .then(() => {
      res.status(201).json({bookId});
    })
    .catch((err) => console.log(err));
};
