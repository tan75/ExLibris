const database = require("../../util/database");
const User = require("../../models/user");

test("User constructor should set props correctly", () => {
  const user1 = new User("id", "John Snow", "john@snow.com", "{'books': []}");
  expect(user1.name).toBe("John Snow");
});

// change the id
