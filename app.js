// Core modules
const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");
const errorController = require("./controllers/error");
const AppErrorController = require("./controllers/error");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" } // append
);
app.use(morgan("combined", { stream: accessLogStream }));

// Parses the url body and calls next()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to serve static files like css files
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use(flash());

app.use((req, res, next) => {
  User.findById("5f9be35bdd3b1f017e4ebf99")
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = new User(user._id, user.name, user.email, user.report);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//app.use(flash);
app.use("/admin", adminRoutes);
//app.use(flash);
app.use(libraryRoutes);
app.use(errorController.get404);

app.use(AppErrorController.getAppError);

mongoConnect(() => {
  app.listen(8000);
});
