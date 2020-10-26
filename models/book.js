const getDb = require("../util/database").getDb;

class Book {
  constructor(title, pages, description, imageUrl) {
    this.title = title;
    this.pages = pages;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    //
  }
}

module.exports = Book;
