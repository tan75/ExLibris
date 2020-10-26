const Book = require("../models/book");

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
  const book = new Book(null, title, imageUrl, description, pages);
  book.save();
  res.redirect("/");
};

exports.getEditBook = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const bookId = req.params.bookId;
  Book.findById(bookId, (book) => {
    if (!book) {
      return res.redirect("/");
    }
    res.render("admin/edit-book", {
      pageTitle: "Edit Book",
      path: "/admin/edit-book",
      editing: editMode,
      book: book,
    });
  });
};

exports.postEditBook = (req, res) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedPages = req.body.pages;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedBook = new Book(
    bookId,
    updatedTitle,
    updatedPages,
    updatedImageUrl,
    updatedDescription
  );
  updatedBook.save();
  res.redirect("/admin/books");
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

exports.postDeleleBook = (req, res) => {
  res.redirect("/");
};
