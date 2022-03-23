const models = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const { hash } = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  signup: {
    post: async (req, res) => {
      console.log("회원가입 콘솔")
      const { email, password, nickname } = req.body;
      if (!email || !password || !nickname) {
        return res
          .status(400)
          .json({ message: "이메일, 비밀번호, 닉네임 필수 입력" });
      }

      const find = await models.findUserbyEmail(email);
      console.log("사용자 정보 이미 존재하나?",find)
      if (find) {
        // console.log("중복입니다!!!!!!!")
        return res.status(409).json({ message: "중복된 이메일 입니다." });
      }

      const hashed = await bcrypt
        .hash(password, config.bcrypt.saltRounds)
        .catch((err) => console.log(err));

      // console.log(hashed);
      // 비밀번호 해쉬화 한 후 회원가입 할 때 그 비밀번호를 넣도록

      const user = await models.registUser(email, hashed, nickname);
      // console.log("암호화된 유저정보",user);
      res.status(201).json(user);
    },
  },

  login: {
    post: async (req,res) => {
      const { email, password } = req.body;
      if(!email || !password){
        return res
          .status(400)
          .json({ message: "이메일, 비밀번호 필수 입력" });
      }

      //일단 이멜 입력해서 전달 
      const find = await models.findUserbyEmail(email).catch(console.log)

      if(!find){
        // console.log("이멜 잘못됐어, 없는 사용자인데요?")
        return res.status(401).json({ message: "invaild user" })
      }

      //비번 확인 
      console.log(find)
      //일단 
      const isValid = await bcrypt.compare(password, find.password).catch(console.log)
      // console.log(isValid,"비번도 맞니??~");

      if(!isValid){
        return res.status(401).json({ message: "invaild password" })
      }

      //jwt토큰 발급해주기
      const accToken = jwt.sign({id: find.id}, config.jwt.secret_key, { expiresIn : config.jwt.expired_in });
      return res.status(201).json({ "data": { "accessToken": accToken }, "message": "ok" })
    }
  },
  // 토큰을 받고, 토큰과 사용자 이름을 돌려주는 컨트롤러
  auth: {
    get: async (req,res) => {
      // console.log(req.headers)

      const token = req.headers['authorization'].split(" ")[1]
      const {id} = req
      // console.log(result)
      res.status(200).json({data: {token, id}, message: "ok"})
    }
  }
};

