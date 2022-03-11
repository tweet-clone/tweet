const express = require('express');
const router = express.Router();


// 트윗
router.get('/', (req, res) => {
});

router.post('/', (req, res) => {
});

router.put('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

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
router.post(':id/reply/:comId', (req, res) => {
});

router.delete(':id/reply/:comId', (req, res) => {
});

// 팔로워
router.post('follow/:id', (req, res) => {
});

router.delete('follow/:id', (req, res) => {
});

// 해시태그
router.post('hashtag/:id', (req, res) => {
});


module.exports = router;