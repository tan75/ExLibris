const Book = require("../models/book");
const mongodb = require("mongodb");

exports.getAddBook = (req, res) => {
  res.render("admin/edit-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
    editing: false,
  });
};

exports.postAddBook = (req, res) => {
  // coming from the view => the name attribute of input tag
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;
  const book = new Book(title, pages, description, imageUrl);
  book
    .save()
    .then((result) => {
      console.log("Created Book");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

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
    .then((result) => {
      console.log("Updated Book!");
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/books");
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
