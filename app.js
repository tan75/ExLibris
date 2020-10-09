const bodyParser = require("body-parser");

const express = require("express");

const app = express();

const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(libraryRoutes);

app.use((req, res) => {
  res.send("<h1>Page Not Found</h1>");
});

app.listen(3000);
