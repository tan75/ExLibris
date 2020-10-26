const fs = require("fs");
const path = require("path");
const { report } = require("../routes/admin");

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

  static deleteBookById(id, bookPages) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedReport = { ...JSON.parse(fileContent) };
      const book = updatedReport.books.find((b) => b.id === id);
      const bookQty = book.qty;
      updatedReport.books = updatedReport.books.filter((b) => b.id !== id);
      updatedReport.totalPages = updatedReport.totalPages - bookPages * bookQty;
      fs.writeFile(p, JSON.stringify(updatedReport), (err) => {
        console.log(err);
      });
    });
  }

  static getReport(cb) {
    fs.readFile(p, (err, fileContent) => {
      const report = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(report);
      }
    });
  }
};
