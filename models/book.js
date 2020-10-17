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
  constructor(t) {
    this.title = t;
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
