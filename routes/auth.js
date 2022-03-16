const express = require('express');
const router = express.Router();

// GET /items Router와 Controller를 연결합니다.
router.get('/signup', (req, res) => {
});

router.get('/login', (req, res) => {

});


router.get('/me', (req, res) => {
});

module.exports = router;



/**
 * 1. Cinent -> Server, 이메일, 비밀번호 보내준다.
 * 
 * 2. Server -> Client, 비밀번호 확인 후 맞다면 JWT토큰을 보내준다.
 * 
 * 3. Client -> Server 트윗을 달거나, 댓글을 달거나, 댓글을 지우거나 이런 요청들을 보낸다\
 * 
 * 4. Server 이 사람이 로그인을 한 사람인지 판단해야됨
 * 
 * 5. 인증이라는 미들웨어를 만들어줘야 한다.
 * 
 * 6. header : { authorization token }
 * 
 * 7. Server 에서 보낸 JWT 토큰이 맞는지 확인
 * 
 * 8. Server -> Client 요청에 대한 응답을 보내준다
 * 
 */