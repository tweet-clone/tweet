const db = require('../db');

module.exports = {
  //해당 트윗 내의 모든 댓글 불러오기
  get: (tweetId) => {
    const queryString = `SELECT * FROM reply WHERE tweet_id = ?`; 
    const params = [tweetId]

    return db
    .execute(queryString, params)
    .then(result => result[0])
    .catch((err) => console.log(err))
  },
  
  //게시물에 댓글쓰기
  post: (userId, tweetId, content) => {
    const queryString = `INSERT INTO reply (user_id, tweet_id, content) VALUES (?,?,?)`;
    const params = [userId, tweetId, content]

    return db
    .execute(queryString, params)
    .then(result => result[0].insertId)
    .catch((err) => console.log(err))
  }
}