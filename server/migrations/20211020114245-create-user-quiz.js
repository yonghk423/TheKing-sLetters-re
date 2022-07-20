'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_quizzes', {
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

    // user < mileage
    await queryInterface.addColumn(
      'mileages',
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

    // quiz < category
    await queryInterface.addColumn(
      'categories',
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

    // quiz < quiz_type
    await queryInterface.addColumn(
      'quiz_types',
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

    // quizContent < quiz_type
    await queryInterface.addColumn(
      'quiz_types',
      'quizContentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizContents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    // quiz < answer_type
    await queryInterface.addColumn(
      'answer_types',
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

    // answerContent < answer_type
    await queryInterface.addColumn(
      'answer_types',
      'answerContentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'answerContents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    // user < quiz
    await queryInterface.addColumn(
      'quizzes',
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

    // user < user_quiz
    await queryInterface.addColumn(
      'user_quizzes',
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

    // quiz < user_quiz
    await queryInterface.addColumn(
      'user_quizzes',
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

    // user < user_usedItem
    await queryInterface.addColumn(
      'user_usedItems',
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

    // usedItem < user_usedItem
    await queryInterface.addColumn(
      'user_usedItems',
      'usedItemId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'usedItems',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_quizzes');
  }
};