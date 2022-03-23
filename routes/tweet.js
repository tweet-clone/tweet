const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth")
const tweetController = require("../controllers/tweet")
const replyController = require("../controllers/reply")


// 트윗
router.get("/", authMiddleware, tweetController.get);

router.post("/",authMiddleware, tweetController.post);

router.put("/:id",authMiddleware, tweetController.put);

router.delete("/:id",authMiddleware, tweetController.delete);

// 트윗 댓글
router.get("/:id/reply",authMiddleware, replyController.get);//

router.post("/:id/reply",authMiddleware, replyController.post);//

router.put("/:id/reply/:comId",authMiddleware, );

router.delete("/:id/reply/:comId",authMiddleware, );

// 좋아요
router.post(":id/reply/:comId",authMiddleware, );

router.delete(":id/reply/:comId",authMiddleware, );

// 팔로워
router.post("follow/:id",authMiddleware, );

router.delete("follow/:id",authMiddleware, );

// 해시태그
router.post("hashtag/:id",authMiddleware, );

module.exports = router;
