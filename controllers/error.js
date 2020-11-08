const AppError = require("../models/AppError");

exports.get404 = (req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/" });
};

exports.appErrorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res
      .status(err.code)
      .render("500", { pageTitle: "Page Not Found", path: "/" });
  }
};
