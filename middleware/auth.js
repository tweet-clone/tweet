const jwt = require("jsonwebtoken");
const config = require("../config/config");
const model = require("../models/user");

module.exports = {
  authMe: {
    get: async (req, res, next) => {
      //   console.log(req);
      const authHeader = req.get("Authorization");

      if (!authHeader) {
        return res.status(401).json({ message: "token is not found" });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, config.jwt.secret_key, async (error, decode) => {
        if (error) {
          return res.status(400).json({ message: "verify error" });
        }

        const findUser = await model.findId(decode.id);

        if (!findUser) {
          return res.status(400).json({ message: "User is not found" });
        }

        req.id = findUser.id;
        next();
      });
    },
  },
};

// tweet create
// req.header => token     1. 헤더에 있는 토큰을 확인 => next();
// req.body   => tweet create
