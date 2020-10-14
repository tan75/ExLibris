const books = [];

exports.getAddBook = (req, res) => {
  res.render("add-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
  });
};

exports.postAddBook = (req, res) => {
  books.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  res.render("library", {
    bks: books,
    pageTitle: "Library",
    path: "/",
  });
};
