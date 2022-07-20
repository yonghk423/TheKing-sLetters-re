'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_quiz.init({
    quizId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'user_quiz',
  });
  return user_quiz;
};