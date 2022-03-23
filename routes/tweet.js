const express = require('express');
const router = express.Router();
const tweet = require('../controllers/tweet');
const like = require('../controllers/like');
const loginAuth = require('../middlewares/auth.js');

// 트윗
router.get('/', loginAuth, tweet.get);

router.post('/', loginAuth, tweet.post);

router.put('/:id', loginAuth, tweet.update);

router.delete('/:id', loginAuth, tweet.del);



// 트윗 댓글
router.get(':id/reply', (req, res) => {
});

router.post(':id/reply', (req, res) => {
});

router.put(':id/reply/:comId', (req, res) => {
});

router.delete(':id/reply/:comId', (req, res) => {
});

// 좋아요
router.post('/like/:id', loginAuth, like.twLike);

router.delete('/dislike/:id', loginAuth, like.twDisLike);

// 팔로워
router.post('follow/:id', (req, res) => {
});

router.delete('follow/:id', (req, res) => {
});

// 해시태그
router.post('hashtag/:id', (req, res) => {
});


module.exports = router;