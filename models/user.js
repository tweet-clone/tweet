const db = require('../db');

module.exports = {

  findUserbyEmail: (email) => {
    const queryString = "SELECT * FROM user WHERE email = ?";
    const params = [email];

    return db
      .execute(queryString, params)
      .then((result) => {
        return result[0][0];
      })
      .catch((err) => console.log(err));
  },

  findUserbyId: (id) => {
    const queryString = `SELECT * FROM user WHERE id = ?`;
    const params = [id]
    return db
    .execute(queryString, params)
    .then((result) => {
      return result[0][0]
    })
    .catch((err) => console.log(err))
  },

  registUser: (email, password, nickname) => {
    const queryString = `INSERT INTO user (email, password, nickname) VALUES (?, ?, ?)`;
    const params = [email, password, nickname];
    return db
      .execute(queryString, params)
      .then((result) => result[0].insertId);
  },

};
