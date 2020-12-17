const Book = require("../models/book");

exports.getAddBook = (req, res) => {
  res.status(200).header("Access-Control-Allow-Origin", "*").json({});
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;

  const book = new Book(
    title,
    pages,
    description,
    imageUrl,
    null,
    req.user._id
  );

  book
    .save()
    .then(() => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({ book });
    })
    .catch((err) => console.log(err));
}; // end postAddBook

exports.getEditBook = (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then((book) => res.status(200).header("Access-Control-Allow-Origin", "*").json({ book }))
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
      res.status(201).header("Access-Control-Allow-Origin", "*").json({book})
    })
    .catch((err) => console.log(err));
};

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").json({ books });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteBook = (req, res) => {
  const bookId = req.body.bookId;
  Book.deleteById(bookId)
    .then(() => {
      res.status(201).header("Access-Control-Allow-Origin", "*").json({bookId});
    })
    .catch((err) => console.log(err));
};
