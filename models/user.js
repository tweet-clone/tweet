const db = require('../db/index.js');

module.exports = {
  signup: {
    //회원가입 기능 : 회원가입할때 일어날 수 있는 오류. 이미 존재하는 아이디인 경우, 
    //아이디가 있는지 없는지 찾아보는 것도 처리하기 있으면, 에러주고, 없으묜 다음단계 가서 비밀번호 해시해서저장하기 
    hasId: (email,callback) => {
      const queryString = `SELECT email FROM user WHERE email = ?`
      const params = [email]
      db.query(queryString, params, (error,result) => {
        if(result.length === 0){ //중복 이메일이 없으면 빈 배열.
          result = 'available email.'
          callback(null,result)
        }else{
          //console.log(error === null)
          error = "email has already been taken."
          callback(error,null)
        }
      })
    },

    post: (email, password, nickname, callback) => {
      const queryString = `INSERT INTO user (email,password,nickname) VALUES (?,?,?)`
      const params = [email, password, nickname]
      db.query(queryString, params, (error,result) => {
        callback(error, result);
      })
    }
  },

  //로그인 기능 
  login: {
    post: () => {

    }
  },

  //인증가능
  get: {
    get: () => {
      
    }
  }
};