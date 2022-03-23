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
    const queryString1 = `INSERT INTO reply (user_id, tweet_id, content) VALUES (?,?,?)`;
    const params1 = [userId, tweetId, content]

    const queryString2 = `SELECT * FROM reply WHERE user_id = ? AND tweet_id = ?`;
    const params2 = [userId, tweetId]

    return db
    .execute(queryString1, params1)
    .then(result => result)
    .then(() => db.execute(queryString2,params2))
    .then(result => {
      return result[0][0]
    })
    .catch((err) => console.log(err))
  }
}