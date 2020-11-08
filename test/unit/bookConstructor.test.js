const ObjectID = require("mongodb").ObjectID;

const Book = require("../../models/book");
const AppError = require("../../models/AppError");

const imageUrl =
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F18043538%2Fshutterstock_91553819.jpg&f=1&nofb=1";

test("book constructor should set propr correctly", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    imageUrl,
    null,
    "5f9be35bdd3b1f017e4ebf99"
  );
  expect(book1.title).toBe("Title");
  expect(book1.pages).toBe(155);
  expect(book1.description).toBe("Description 1");
  expect(book1.imageUrl).toBe(imageUrl);
  expect(book1._id).toBe(null);
  expect(book1.userId).toBe("5f9be35bdd3b1f017e4ebf99");

  // probably should handle this kind of input data correctly and not to create a title Function?
  const book2 = new Book(() => {}, 123123123, { lol: "wtf" }, [], -1, [[]]);
  expect(book2.validate).toThrow(TypeError);
});

// test("book constructor should generate _id if nothing passed", () => {
//   //const book1 = new Book('blah', 'pew’, 'aaaaa', 'test', 123, '04124');
//   expect(book1._id).toBe(typeof ObjectID); // probably will throw an error, should you handle that?
// });
