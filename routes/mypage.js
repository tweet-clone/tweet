const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/auth")




// 내가 팔로워한 사람 목록 가져오기
router.get("/follow", (req, res) => {});

// 내가 쓴 글 가져오기
router.get("/tweet", (req, res) => {});

module.exports = router;
