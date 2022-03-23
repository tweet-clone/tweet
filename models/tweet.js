const db = require("../db");

// const join = ''

module.exports = {
  getAll: () => {
    const queryString = "SELECT * FROM tweet";

    return db
      .execute(queryString)
      .then((result) => {
        return result[0];
      })
      .catch((err) => console.log(err));
  },
  get: (tweetId) => {
    const queryString = "SELECT * FROM tweet WHERE id = (?)";
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
      "INSERT INTO tweet (content, user_id ,picture) VALUES (?,?,?) ";

    const params = [content, userId, picture];

    return db
      .execute(queryString, params)
      .then((result) => result[0][0])
      .catch((err) => console.log(err));
  },

  update: (tweetId, content, picture) => {
    const queryString =
      "UPDATE tweet SET content = (?), picture = (?) WHERE id = (?)";
    const params = [content, picture, tweetId];

    return db
      .execute(queryString, params)
      .then(() => tweetId)
      .catch((err) => console.log(err));
  },

  delete: (tweetId) => {
    const queryString = "DELETE FROM tweet WHERE ID = (?)";
    const params = [tweetId];

    return db.execute(queryString, params);
  },
};
