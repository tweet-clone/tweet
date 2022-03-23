const models = require("../models/user");

const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req,res,next) => {

// 역할 각자 22일까지만들어오고 머지하고, 바로 23일 트윗 CRUD 만들어놓기
//유저 토큰으로 인증
//tweet
/*
//미들웨어. 얘는 클라이언트가 액세스 토큰을 주었을 때, 액세스 토큰을 받아오고, 
//그 토큰을 검증한다. 
*/
//사용자 단에서는 모든 요청에 대해 액세스 토큰을 헤더에 담아서 줘야 한다. 
  const authorization = req.headers['authorization']
  //만약에 이것이 아얘 없는 요청이 들어오는 경우
  if(authorization === undefined) return res.status(400).json({"data": null, "message": "no access token provided."})
  //토큰이 있는 채로 들어오는 경우
    //유효하지 않은 토큰인 경우
    //유효한 토큰인 경우
  const token = authorization.split(' ')[1]
  console.log(token)
  try{
    //일단 해독이 되는 토큰이면. 즉 우리 서버가 발급해준 토큰인 경우 
    const payload = jwt.verify(token,process.env.SECRET_KEY)

    //사용자가 토큰 발급해놓고 하루만에 탈퇴했다면
    const result = await models.findUserbyId(payload.id)
    if(!result) return res.status(400).json({"data": null, "message": "access token has been tempered"})
    //console.log(payload,"페이로드")
    //다음 미들웨어에게 제어권 넘기기
    req.id = payload.id
    next()
  }catch(err){
    //토큰자체가 오류: 
    return res.status(400).json({ "data": null, "message": "invalid access token" })
  }
}
