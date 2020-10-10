const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/admin/add-book", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-book.html"));
});

router.post("/add-book", (req, res) => {
  res.redirect("/");
});

module.exports = router;
