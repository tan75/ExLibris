const Book = require("../models/book");

exports.getAddBook = (req, res) => {
  res.render("add-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
  });
};

exports.postAddBook = (req, res) => {
  const book = new Book(req.body.title);
  book.save();
  res.redirect("/");
};

exports.getBooks = (req, res) => {
  const books = Book.fetchAll();
  res.render("library", {
    bks: books,
    pageTitle: "Library",
    path: "/",
  });
};
