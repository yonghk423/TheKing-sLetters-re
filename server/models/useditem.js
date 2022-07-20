'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usedItem.init({
    company: DataTypes.STRING,
    itemName: DataTypes.STRING,
    barcodeNum: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    itemImage: DataTypes.STRING,
    deadline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usedItem',
  });
  return usedItem;
};