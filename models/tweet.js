const db = require('../db');

const join =
  'SELECT t.id, t.user_id , u.nickname, t.content, t.picture, t.total_reply, t.total_like,  t.created_at FROM tweet as t JOIN user as u ON u.id = t.user_id';

module.exports = {
  getAll: () => {
    const queryString = `${join}`;

    return db
      .execute(queryString)
      .then((result) => {
        return result[0];
      })
      .catch((err) => console.log(err));
  },

  get: (tweetId) => {
    // 트윗 하나를 가져 온다. update의 결과 json으로 보내줌 혹은 인증 절차에 사용
    // tweet.user_id 이용 한다.
    const queryString = `${join} WHERE t.id = (?)`;
    const params = [tweetId];

    return db
      .execute(queryString, params)
      .then((result) => {
        return result[0][0];
      })
      .catch((err) => console.log(err));
  },

  post: (content, userId, picture) => {
    const queryString =
      'INSERT INTO tweet (content, user_id ,picture) VALUES (?,?,?) ';

    const params = [content, userId, picture];

    return db
      .execute(queryString, params)
      .then((result) => result[0])
      .catch((err) => console.log(err));
  },

  update: (tweetId, content, picture) => {
    const queryString =
      'UPDATE tweet SET content = (?), picture = (?) WHERE id = (?)';
    const params = [content, picture, tweetId];

    return db
      .execute(queryString, params)
      .then(() => tweetId)
      .catch((err) => console.log(err));
  },

  // 댓글이 있을 경우 댓글 먼저 삭제
  // 그 다음 트윗 삭제

  delete: (tweetId) => {
    const queryString = 'DELETE FROM tweet WHERE ID = (?)';
    const params = [tweetId];

    return db.execute(queryString, params);
  },
};
