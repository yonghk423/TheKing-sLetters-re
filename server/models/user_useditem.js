'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_usedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_usedItem.init({
    usedItemId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'user_usedItem',
  });
  return user_usedItem;
};