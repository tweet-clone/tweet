const db = require("../db");

module.exports = {
  signup: {
    findUser: (email) => {
      const queryString = "SELECT * FROM user WHERE email = ?";
      const params = [email];

      return db
        .execute(queryString, params)
        .then((result) => {
          result[0][0];
          console.log(result[0][0]);
        })
        .catch((err) => console.log(err));
    },
    post: (email, password, nickname) => {
      const queryString = `INSERT INTO user (email, password, nickname) VALUES (?, ?, ?)`;
      const params = [email, password, nickname];
      return db
        .execute(queryString, params)
        .then((result) => result[0].insertId);
    },
  },
};
