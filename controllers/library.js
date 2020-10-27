const Book = require("../models/book");
const Report = require("../models/report");

exports.getBooks = (req, res) => {
  Book.fetchAll()
    .then((books) => {
      res.render("library/book-list", {
        bks: books,
        pageTitle: "All Books",
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBook = (req, res) => {
  const bookId = req.params.bookId; // comes from the route
  Book.findById(bookId)
    .then((book) => {
      res.render("library/book-detail", {
        book: book,
        pageTitle: book.title,
        path: "/books",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Book.fetchAll().then((books) => {
    res
      .render("library/index", {
        bks: books,
        pageTitle: "Home",
        path: "/",
      })
      .catch((err) => console.log(err));
  });

  exports.getReport = (req, res) => {
    Report.getReport((report) => {
      Book.fetchAll((books) => {
        const reportBooks = [];
        for (let book of books) {
          const reportBookData = report.books.find((bk) => bk.id === book.id);
          if (reportBookData) {
            reportBooks.push({ bookData: book, pages: reportBookData.pages });
          }
        }
        res.render("library/report", {
          path: "/report",
          pageTitle: "Your Report",
          books: reportBooks,
        });
      });
    });
  };

  // exports.postReport = (req, res) => {
  //   const bookId = req.body.bookId;
  //   Book.findById(bookId, (book) => {
  //     console.log(book);
  //     Report.addBook(bookId, book.pages);
  //   });
  //   res.redirect("/report");
  // });
};
