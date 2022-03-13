const express = require("express");
const router = express.Router();

// GET /items Router와 Controller를 연결합니다
const auth = require("../controllers/auth");

router.post("/signup");

router.post("/login");

router.get("/me", (req, res) => {});

module.exports = router;
