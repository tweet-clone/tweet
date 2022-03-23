const models = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: {
    post: async (req, res) => {
      const { email, password, nickname } = req.body;
      if (!email || !password || !nickname) {
        return res
          .status(400)
          .json({ message: "이메일, 비밀번호, 닉네임 필수 입력" });
      }

      const find = await models.findUser(email);
      if (find) {
        return res.status(409).json({ message: "중복된 이메일 입니다." });
      }

      const hashed = await bcrypt
        .hash(password, config.bcrypt.saltRounds)
        .catch((err) => console.log(err));

      const user = await models.post(email, hashed, nickname);
      console.log(user);
      res.status(201).json(user);
    },
  },

  login: {
    post: async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "이메일, 비밀번호 필수 입력" });
      }

      //일단 이멜 입력해서 전달
      const find = await models.findUser(email).catch(console.log);

      if (!find) {
        return res.status(401).json({ message: "invaild user" });
      }

      //비번 확인
      //일단
      const isValid = await bcrypt
        .compare(password, find.password)
        .catch(console.log);

      if (!isValid) {
        return res.status(401).json({ message: "invaild password" });
      }

      //jwt토큰 발급해주기
      const { id } = find;
      // console.log(id);
      const token = await createJwtToken(id);
      // console.log(token);
      return res
        .status(201)
        .json({ data: { accessToken: token }, message: "ok" });
    },
  },
  me: {
    // 내 정보
    get: async (req, res, next) => {
      // console.log(req.id);
      const user = await models.findId(req.id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const token = req.get("authorization").split(" ")[1];
      res.status(200).json({ token: token, email: user.email });
    },
  },
};

async function createJwtToken(id) {
  const accToken = jwt.sign({ id }, config.jwt.secret_key, {
    expiresIn: config.jwt.expired_in,
  });
  return accToken;
}

// 로그인
//토큰인증요청 ??? 일일이 토큰처리 못하니까 일단 고민해보기 ...* 미들웨어 또는 다른 대안 찾아볼 것
