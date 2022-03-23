const db = require('../db');

module.exports = {
  //테이블의 모든 트윗 불러오기
  get: () => {
    const queryString = `SELECT * FROM tweet`;

    return db
    .execute(queryString)
    .then(result => {
      console.log(result[0])
      return result[0]
    })
    .catch((err) => console.log(err))
  },
  
  //테이블에 게시물 넣기
  post: (id,content,picture = null) => {
    const queryString = `INSERT INTO tweet (user_id, content, picture) VALUES (?,?,?)`;
    const params = [id, content, picture]

    return db
    .execute(queryString,params)
    .then(result => {
      // console.log(result[0],"본문")
      return result[0].insertId
    })
    .catch((err) => console.log(err))
  },

  put: (content, picture = null, tweetId, id) => {
    //쿼리문 1) 주어진 사용자, 그리고 포스트 번호와 일치하는 트윗을 찾는다. 
    const queryString = `UPDATE tweet SET content = ?, picture = ? WHERE id = ? AND user_id = ?`;
    const params = [content, picture, tweetId, id]

    return db
    .execute(queryString, params)
    .then(result => {
      // console.log(result[0],"1번 쿼리 결과")
      return result[0]
    })
    .catch((err) => console.log(err))
  },

  delete: (tweetId, id) => {
    const queryString = `DELETE FROM tweet WHERE id = ? AND user_id = ?`;
    const params = [tweetId, id]

    return db
    .execute(queryString, params)
    .then(result => {
      // console.log(result[0],"삭제쿼리결과")
      return result[0]
    })
    .catch((err) => console.log(err))
  }

  //수정하거나 삭제할 트윗의 아이디를 
}