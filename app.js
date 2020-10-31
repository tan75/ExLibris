const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");
const errorController = require("./controllers/error");

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to serve static files like css files

app.use((req, res, next) => {
  User.findById("5f9be35bdd3b1f017e4ebf99")
    .then((user) => {
      req.user = new User(user._id, user.name, user.email, user.report);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(libraryRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(8000);
});
