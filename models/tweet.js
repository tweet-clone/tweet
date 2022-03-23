const db = require("../db");

module.exports = {
  get: () => {
    const queryString = "SELECT * FROM tweet";

    return db
      .execute(queryString)
      .then((result) => {
        // console.log(result[0]);
        return result[0];
      })
      .catch((err) => console.log(err));
  },
  findId: (id) => {
    const queryString = "SELECT id FROM user WHERE id = (?)";
    const params = [id];

    return db
      .execute(queryString, params)
      .then((result) => result[0][0])
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
};
