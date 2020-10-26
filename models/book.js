const fs = require("fs");
const path = require("path");

const Report = require("./report");

const { timeStamp } = require("console");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "books.json"
);

const getBooksFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Book {
  constructor(id, title, imageUrl, description, pages) {
    timeStamp.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.pages = pages;
  }

  save() {
    getBooksFromFile((books) => {
      if (this.id) {
        const existingBookIndex = books.findIndex((b) => b.id === this.id);
        const updatedBooks = [...books];
        updatedBooks[existingBookIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedBooks), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.floor(Math.random() * 100);
        books.push(this);
        fs.writeFile(p, JSON.stringify(books), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    const bId = parseInt(id); // convert id to number
    getBooksFromFile((books) => {
      const book = books.find((b) => b.id === bId);
      const updatedBooks = books.filter((b) => b.id !== bId);
      fs.writeFile(p, JSON.stringify(updatedBooks), (err) => {
        if (!err) {
          Report.deleteBookById(id, book.pages);
        }
      });
    });
  }

  static fetchAll(cb) {
    getBooksFromFile(cb);
  }

  static findById(id, cb) {
    getBooksFromFile((books) => {
      const bId = parseInt(id); // convert id to number
      const book = books.find((b) => {
        if (b.id === bId) return b;
      });
      cb(book);
    });
  }
};
