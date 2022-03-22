const db = require('../db');

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
<<<<<<< HEAD

=======
>>>>>>> a53a0f18798b850556bd29733bc28c524215eb46
    },
  },

  //로그인 기능 
  login: {
    findUser: (email) => {
      const queryString = `SELECT * FROM user WHERE email = ?`
      const params = [email]
      return db
        .execute(queryString, params)
        .then((result) => result)
    }
  },

};
