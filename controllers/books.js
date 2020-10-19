const Book = require("../models/book");

exports.getAddBook = (req, res) => {
  res.render("admin/add-book", {
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
  Book.fetchAll((books) => {
    res.render("library/book-list", {
      bks: books,
      pageTitle: "Library",
      path: "/",
    });
  });
};
