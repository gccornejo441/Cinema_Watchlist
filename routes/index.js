const express = require("express");
const { ensureAuthenticated } = require("../config/auth");

const router = express.Router();

// GET root
router.get("/", (req, res, next) => {
  res.render("home");
});

// GET homepage
router.get("/homepage", ensureAuthenticated, (req, res, next) => {
  const username = req.user.username;

  res.render("home2", { user: username });
});

module.exports = router;
