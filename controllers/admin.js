const Book = require("../models/book");

exports.getAddBook = (req, res) => {
  res.render("admin/add-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
  });
};

exports.postAddBook = (req, res) => {
  // coming from the view => the name attribute of input tag
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;
  const book = new Book(title, imageUrl, description, pages);
  book.save();
  res.redirect("/");
};

exports.getBooks = (req, res) => {
  Book.fetchAll((books) => {
    res.render("admin/books", {
      bks: books,
      pageTitle: "Admin Books",
      path: "/admin/books",
    });
  });
};
