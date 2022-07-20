'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usedItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING
      },
      itemName: {
        type: Sequelize.STRING
      },
      barcodeNum: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      itemImage: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.STRING
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usedItems');
  }
};