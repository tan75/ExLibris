const fs = require("fs");
const path = require("path");

const getBooksFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "books.json"
);

module.exports = class Book {
  constructor(title, imageUrl, description, pages) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.pages = pages;
  }

  save() {
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
};
