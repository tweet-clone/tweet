const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Tweet = require('./tweet');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Tweet = Tweet;

User.init(sequelize);
Tweet.init(sequelize);

User.associate(db);
Tweet.associate(db);

module.exports = db;