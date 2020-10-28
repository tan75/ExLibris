const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const collectionName = "books";

class Book {
  constructor(title, pages, description, imageUrl, id) {
    this.title = title;
    this.pages = pages;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("books")
        .updateOne({ _id: new mongoDb.ObjectID(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("books").insertOne(this);
    }
    return dbOp
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
        return books;
      })
      .catch((err) => console.log(err));
  }

  static findById(bookId) {
    const db = getDb();
    return db
      .collection("books")
      .find({ _id: new mongoDb.ObjectID(bookId) })
      .next()
      .then((book) => {
        return book;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(bookId) {
    const db = getDb();
    return db
      .collection(collectionName)
      .deleteOne({ _id: new mongoDb.ObjectID(bookId) })
      .then(() => {
        console.log("Book Deleted");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Book;
