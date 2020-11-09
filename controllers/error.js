const AppError = require("../models/appError");

exports.get404 = (req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/" });
};

exports.getAppError = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.render("500", {
      pageTitle: "Error",
      path: "/500",
      errorMessage: err.message,
    });
    return;
  }
};
