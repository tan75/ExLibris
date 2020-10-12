const path = require("path");

const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public"))); // to serve static files like css files

const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(libraryRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
