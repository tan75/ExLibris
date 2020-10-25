const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");
const errorController = require("./controllers/error");

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to serve static files like css files

app.use("/admin", adminRoutes);
app.use(libraryRoutes);
app.use(errorController.get404);

//app.listen(3000);
app.listen(80);
