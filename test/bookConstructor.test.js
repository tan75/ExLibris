const Book = require("../models/book");

test("book constructor should set propr correctly", () => {
  const book1 = new Book(
    "Title",
    155,
    "Description 1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F18043538%2Fshutterstock_91553819.jpg&f=1&nofb=1",
    "5f9be35bdd3b1f017e4ebf99"
  );
  expect(book1.title).toBe("Title");
});
