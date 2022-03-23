const db = require('../db');

module.exports = {
  //테이블의 모든 트윗 불러오기
  get: () => {
    const queryString = `
    SELECT t.id, u.nickname, t.content, t.picture, t.total_reply, t.total_like, t.created_at 
    FROM tweet as t 
    JOIN user as u ON u.id = t.user_id`; 

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
    const queryString1 = `UPDATE tweet SET content = ?, picture = ? WHERE id = ? AND user_id = ?`;
    const params1 = [content, picture, tweetId, id]

    const queryString2 = `SELECT * FROM tweet WHERE id = ?`;
    const params2 = [tweetId]

    return db
    .execute(queryString1, params1)
    .then(result => result[0])
    .then(() => db.execute(queryString2,params2))
    .then(result => result[0][0])
    .catch((err) => console.log(err))
  },

  delete: (tweetId, id) => {
    const queryString = `DELETE FROM tweet WHERE id = ? AND user_id = ?`;
    const params = [tweetId, id]

    return db
    .execute(queryString, params)
    .then(result => [result[0].affectedRows,tweetId])
    .catch((err) => console.log(err))
  }

}