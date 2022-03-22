const models = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const { hash } = require("bcrypt");

module.exports = {
  signup: {
    post: async (req, res) => {
      const { email, password, nickname } = req.body;
      if (!email || !password || !nickname) {
        return res
          .status(400)
          .json({ message: "이메일, 비밀번호, 닉네임 필수 입력" });
      }

      const find = await models.signup.findUser(email);

      if (find) {
        return res.status(409).json({ message: "중복된 이메일 입니다." });
      }

      const hashed = await bcrypt
        .hash(password, config.bcrypt.saltRounds)
        .catch((err) => console.log(err));

      const user = await models.signup.post(email, hashed, nickname);
      console.log(user);
      res.status(201).json(user);

      //회원가입 하면 토큰 같이 발행 (create token)
    },
  },
};

// 로그인

// express-validator
// jwt - secret_key , expried => .env

// 아이디와 비밀번호를 입력
// 데이터베이스에 있는 아이디와 비밀번호(해쉬)가 맞는지
// token

// 회원가입 유저한테 토큰이 발행
// 클라이언트 측에서 아이디와 비밀번호를 서버로 보냄
