const Sequelize = require('sequelize');
 
module.exports = class Tweet extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      picture: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      totalLike: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalReply: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Tweet',
      tableName: 'tweets',
      paranoid: false,
      // mb4 -> 이모티콘도 사용 가능 
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    db.Tweet.belongsTo(db.User);
  }
}; 