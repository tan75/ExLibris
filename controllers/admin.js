const Book = require("../models/book");
const AppError = require("../models/appError");
//const mongodb = require("mongodb");
const { validationResult } = require("express-validator");

exports.getAddBook = (req, res) => {
  // to get rid of the empty message block
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("admin/edit-book", {
    pageTitle: "Add Book",
    path: "/admin/add-book",
    editing: false,
    errorMessage: message,
    // to keep old user input
    oldInput: {
      book: {
        title: "",
        imageUrl: "",
        pages: 0,
        description: "",
      },
    },
  });
}; // end getAddBook

exports.postAddBook = (req, res, next) => {
  // req.query.edit - coming from the view => the name attribute of input tag
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const pages = req.body.pages;
  const description = req.body.description;
  const errors = validationResult(req);
  const editMode = req.query.edit;
  const id = req.body.bookId;

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-book", {
      pageTitle: "Add Book",
      path: "/admin/edit-book",
      editing: editMode,
      book: {
        title: title,
        imageUrl: imageUrl,
        pages: pages,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      // To keep old user input
      oldInput: {
        book: {
          title: title,
          imageUrl: imageUrl,
          pages: pages,
          description: description,
        },
      },
    });
  }

  const book = new Book(
    title,
    //() => {}, // title for testing constructor
    pages,
    description,
    imageUrl,
    null,
    req.user._id
  );

  // Error Handling
  if (typeof book.title !== "string") {
    next(new AppError(500, "Invalid book title"));
    return;
  }

  // ToDo fix Bug
  // if (typeof pages !== "number") {
  //   next(new AppError(500, "Invalid page number"));
  //   console.log(typeof book.pages);
  //   return;
  // }

  if (typeof description !== "string") {
    next(new AppError(500, "Invalid book description"));
    return;
  }

  if (typeof imageUrl !== "string") {
    next(new AppError(500, "Invalid image URL"));
    return;
  }

  if (typeof req.user._id !== "object") {
    next(new AppError(500, "Invalid user ID"));
    return;
  }

  // End Error handling

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
        errorMessage: "",
      });
    })
    .catch((err) => console.log(err));
}; // end getEditBook

exports.postEditBook = (req, res) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedPages = req.body.pages;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-book", {
      pageTitle: "Edit Book",
      path: "/admin/edit-book",
      editing: "true",
      hasError: true,
      //book: book,
      book: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        pages: updatedPages,
        description: updatedDescription,
      },
      errorMessage: errors.array()[0].msg,
    });
  }

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
      console.log("Updated Book!");
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
}; // end postEditBook

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
