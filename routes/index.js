const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const tweetRouter = require('./tweet')
const mypageRouter = require('./mypage')



router.use('/auth', authRouter);

//이 두군데로 들어오는 요청은 반드시 인증 미들웨어를 거치도록 하자!
router.use('/tweet', tweetRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
