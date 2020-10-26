const getDb = require("../util/database").getDb;

class Book {
  constructor(title, pages, description, imageUrl) {
    this.title = title;
    this.pages = pages;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("books")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}

module.exports = Book;
