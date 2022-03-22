const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.signup.post);

router.post("/login", authController.signup.post);

router.get("/me", (req, res) => {});

module.exports = router;
