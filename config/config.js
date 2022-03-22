const dotenv = require("dotenv");
dotenv.config();

const config = {
  db: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
  jwt: {
    secret_key: process.env.SECRET_KEY,
    expired_in: process.env.EXPIRED_IN,
<<<<<<< HEAD
  },
=======
  }, 
>>>>>>> a53a0f18798b850556bd29733bc28c524215eb46
};

module.exports = config;
