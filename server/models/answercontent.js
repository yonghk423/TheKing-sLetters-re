'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answerContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  answerContent.init({
    answerCode: DataTypes.STRING,
    answerComment: DataTypes.STRING,
    answerType: DataTypes.STRING,
    correctAnswer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'answerContent',
  });
  return answerContent;
};