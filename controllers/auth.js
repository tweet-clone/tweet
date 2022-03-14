const models = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  signup: {
    post: (req, res) => {
      const { email, password, nickname } = req.body;
      if (!email || !password || !nickname) {
        return res
          .status(400)
          .json({ message: "이메일, 비밀번호, 닉네임 필수 입력" });
      }

      models.signup.findUser(email, (error, result) => {
        if (result) {
          return res.status(409).json({ message: "이메일이 이미 있습니다." });
        }
      });

      // 비밀번호 해쉬화 한 후 회원가입 할 때 그 비밀번호를 넣도록

      models.signup.post(email, password, nickname, (error, result) => {
        if (error) {
          res.status(409).json("message : signup error");
        } else {
          res.status(201).json(result);
        }
      });
    },
  },
};

// 로그인
