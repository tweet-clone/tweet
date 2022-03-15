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
        console.log("유저찾기")
        if (error) {
          return res.status(409).json({ message: "이메일이 이미 있습니다." });
        }else{
          // 비밀번호 해쉬화 한 후 회원가입 할 때 그 비밀번호를 넣도록
          bcrypt.hash(password,10,(error,hash) => {
            if(error) return res.status(500).json({ message: "비번암호화실패"})
            return models.signup.post(email, hash, nickname, (error, result) => {
              console.log("진짜 가입")
              if (error) {
                return res.status(409).json({message : "signup error"});
              } else {
                return res.status(201).json(result);
              }
            })
          })
        }
      });
    },
  },
};

// 로그인
