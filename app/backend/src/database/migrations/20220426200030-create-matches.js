'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull:false,
        references: {
          model:'teams',
          key:'id',
        }


      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        foreignKey:true,
        allowNull:false,
        references:{
          model:'teams',
          key:'id',
        }
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};