const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "books.json"
);

module.exports = class Book {
  constructor(t) {
    this.title = t;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let books = [];
      if (!err) {
        books = JSON.parse(fileContent);
      }

      books.push(this);
      fs.writeFile(
        p,
        JSON.stringify(books, (err) => {
          console.log(err);
        })
      );
    });
  }

  static fetchAll() {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return [];
      }
      return JSON.parse(fileContent);
    });
  }
};
