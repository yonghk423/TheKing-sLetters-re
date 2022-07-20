'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_clearQuizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // user < user_clearQuiz
    await queryInterface.addColumn(
      'user_clearQuizzes',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    // quiz < user_clearQuiz
    await queryInterface.addColumn(
      'user_clearQuizzes',
      'quizId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizzes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_clearQuizzes');
  }
};