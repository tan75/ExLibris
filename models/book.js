const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, description, pages) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.pages = pages;
  }

  save() {
    this.id = Math.floor(Math.random() * 100);
    getBooksFromFile((books) => {
      books.push(this);
      fs.writeFile(p, JSON.stringify(books), (err) => {
        console.log(err);
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
