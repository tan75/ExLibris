const Book = require("../models/book");
const mongodb = require("mongodb");
const { validationResult } = require("express-validator");
const flash = require("connect-flash");

exports.getAddBook = (req, res) => {
  res.render("admin/edit-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
    editing: false,
    errorMessage: req.flash("error"),
  });
};

exports.postAddBook = (req, res) => {
  // req.query.edit - coming from the view => the name attribute of input tag
  const editMode = req.query.edit;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("error", "Invalid Book Title");
    return res.redirect("/admin/add-book");
    // res.status(422).render("admin/edit-book", {
    //   pageTitle: "Add Book",
    //   path: "/admin/edit-book",
    //   editing: editMode,
    //   //book: book,
    //   errorMessage: errors.array(),
    // });
  }

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
      console.log("Created Book");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
}; // end postAddBook

exports.getEditBook = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.redirect("/");
      }
      res.render("admin/edit-book", {
        pageTitle: "Edit Book",
        path: "/admin/edit-book",
        editing: editMode,
        book: book,
      });
    })
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
    new mongodb.ObjectID(bookId)
  );
  book
    .save()
    .then(() => {
      console.log("Updated Book!");
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
};

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.render("admin/books", {
        bks: books,
        pageTitle: "Admin Books",
        path: "/admin/books",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleleBook = (req, res) => {
  const bookId = req.body.bookId;
  Book.deleteById(bookId)
    .then(() => {
      console.log("Book Deleted");
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
};
