const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const authMiddleware = require("../Middleware/auth")


router.post("/signup", authController.signup.post);

router.post("/login", authController.login.post);

router.get("/me", authMiddleware, authController.auth.get) //사용자가 자신이 가진 토큰으로 세부 사용자 정보 요청

module.exports = router;
