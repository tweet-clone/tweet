const Sequelize = require('sequelize');
const { sequelize } = require('.');

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
          underscored: true,
          modelName: 'User',
          tableName: 'users',
          paranoid: false,
          charset: 'utf8mb4', 
          collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        
    }
};