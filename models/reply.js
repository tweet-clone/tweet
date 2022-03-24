const db = require("../db");

module.exports = {
  getAll: (tweetId) => {
    const queryString = "SELECT * FROM reply WHERE tweet_id = (?)";
    const params = [tweetId];

    return db
      .execute(queryString, params)
      .then((result) => result[0])
      .catch((err) => console.log(err));
  },
  get: (tweetId, replyId) => {
    const queryString = "SELECT * FROM reply WHERE tweet_id = (?) AND id = (?)";
    const params = [tweetId, replyId];

    return db
      .execute(queryString, params)
      .then((result) => result[0][0])
      .catch((err) => console.log(err));
  },
  post: (content, userId, tweetId) => {
    const queryString =
      "INSERT INTO reply (content, user_id, tweet_id) VALUES (?, ?, ?)";
    const params = [content, userId, tweetId];

    return db
      .execute(queryString, params)
      .then((result) => result[0][0])
      .catch((err) => console.log(err));
  },
  update: (content, tweetId, replyId) => {
    const queryString =
      "UPDATE reply SET content = (?) WHERE tweet_id = (?) AND id = (?)";
    const params = [content, tweetId, replyId];

    return db
      .execute(queryString, params)
      .then(() => replyId)
      .catch((err) => console.log(err));
  },
  delete: (tweetId, replyId) => {
    const queryString = "DELETE FROM reply WHERE tweet_id = (?) AND id = (?) ";
    const params = [tweetId, replyId];

    return db.execute(queryString, params);
  },
};
