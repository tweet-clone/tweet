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

      // console.log(hashed);
      // 비밀번호 해쉬화 한 후 회원가입 할 때 그 비밀번호를 넣도록

      const user = await models.signup.post(email, hashed, nickname);
      console.log(user);
      res.status(201).json(user);
    },
  },
};

// 로그인
