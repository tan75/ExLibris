const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

const ObjectId = mongoDb.ObjectId;

// Collections
const userCollectionName = "users";
const booksCollectionName = "books";

class User {
  constructor(id, name, email, report) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.report = report || []; //{books: []}
  }

  save() {
    const db = getDb();
    return db.collection(userCollectionName).insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection(userCollectionName)
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  getReport() {
    const db = getDb();
    const bookIds = this.report.books.map((i) => {
      return i.bookId;
    });

    //TT Change the logic to return total pages only
    return db
      .collection(userCollectionName)
      .find({})
      .next()
      .then((user) => {
        return user.report.totalPages;
      })
      .catch((err) => console.log(err));
  }

  addToReport(book) {
    const reportBookIndex = this.report.books.findIndex((rb) => {
      return rb.bookId.toString() === book._id.toString();
    });

    let newPages = 0;
    const updatedReportBooks = [...this.report.books];
    let totalPagesRead;

    if (this.report.books.length > 0) {
      totalPagesRead = this.report.totalPages;
    } else {
      totalPagesRead = 0;
    }

    // Check the if the book already exists
    // and add pages
    if (reportBookIndex >= 0) {
      // TT 20201120 book.pages will get the currect page number
      newPages =
        Math.floor(this.report.books[reportBookIndex].pages) + book.pages;
      updatedReportBooks[reportBookIndex].pages = newPages;
    } else {
      updatedReportBooks.push({
        bookId: new ObjectId(book._id),
        title: book.title,
        pages: +book.pages,
      });
      newPages = book.pages;
    }

    totalPagesRead = totalPagesRead + +book.pages;

    const updatedReport = {
      books: updatedReportBooks,
      totalPages: totalPagesRead,
    };

    const db = getDb();
    return db.collection(userCollectionName).updateOne(
      {
        _id: new ObjectId(this._id),
      },
      { $set: { report: updatedReport } }
    );
  } // end addToReport
}

module.exports = User;
