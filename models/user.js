const db = require("../db");

module.exports = {
  signup: {
    findUser: (email, callback) => {
      const queryString = `SELECT email FROM user WHERE email = ${email}`;
      const params = [email];

      db.query(queryString, params, (error, result) => {
        callback(error, result);
      });
    },

    post: (email, password, nickname, callback) => {
      const queryString = `INSERT INTO user (email, password, nickname) VALUES (?, ? , ?)`;
      const params = [email, password, nickname];

      db.query(queryString, params, (error, result) => {
        console.log(error);
        callback(error, result);
      });
    },
  },
};
