const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "report.json"
);

module.exports = class Report {
  static addBook(id, bookPages) {
    //Fetch the previous report
    fs.readFile(p, (err, fileContent) => {
      let report = { books: [], totalPages: 0 };
      if (!err) {
        report = JSON.parse(fileContent);
      }
      // Analyze the report => find existing books
      const existingBookIndex = report.books.findIndex((b) => b.id === id);
      const existingBook = report.books[existingBookIndex];
      let updatedBook;

      // Add new book or increase quantity of pages
      if (existingBook) {
        updatedBook = { ...existingBook };
        updatedBook.qty = updatedBook.qty + 1;
        report.books = [...report.books];
        report.books[existingBookIndex] = updatedBook;
      } else {
        updatedBook = { id: id, qty: 1 };
        report.books = [...report.books, updatedBook];
      }

      // Get total pages
      report.totalPages = report.totalPages + +bookPages;
      fs.writeFile(p, JSON.stringify(report), (err) => {
        console.log(err);
      });
    });
  }
};
