const Sequelize = require('sequelize');
 
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }, 
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      // mb4 -> 이모티콘도 사용 가능 
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
   db.User.hasMany(db.Tweet)
   db.User.belongsToMany(db.Tweet, {
      as: 'Liked',
      through: 'TweetLike',
    })
  }
}; 