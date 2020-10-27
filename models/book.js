const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

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

  static fetchAll() {
    const db = getDb();
    return db
      .collection("books")
      .find()
      .toArray()
      .then((books) => {
        console.log(books);
        return books;
      })
      .catch((err) => console.log(err));
  }

  static findById = (bookId) => {
    const db = getDb();
    return db
      .collection("books")
      .find({ _id: new mongoDb.ObjectID(bookId) })
      .next()
      .then((book) => {
        console.log(book);
        return book;
      })
      .catch((err) => console.log(err));
  };
}

module.exports = Book;
