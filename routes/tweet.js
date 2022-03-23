const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth")
const tweetController = require("../controllers/tweet")



// 트윗
router.get("/", authMiddleware, tweetController.tweet.get);

router.post("/",authMiddleware, tweetController.tweet.post);

router.put("/:id",authMiddleware, tweetController.tweet.put);

router.delete("/:id",authMiddleware, tweetController.tweet.delete);

// 트윗 댓글
router.get(":id/reply",authMiddleware, );

router.post(":id/reply",authMiddleware, );

router.put(":id/reply/:comId",authMiddleware, );

router.delete(":id/reply/:comId",authMiddleware, );

// 좋아요
router.post(":id/reply/:comId",authMiddleware, );

router.delete(":id/reply/:comId",authMiddleware, );

// 팔로워
router.post("follow/:id",authMiddleware, );

router.delete("follow/:id",authMiddleware, );

// 해시태그
router.post("hashtag/:id",authMiddleware, );

module.exports = router;
