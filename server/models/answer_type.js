'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  answer_type.init({
    quizId: DataTypes.NUMBER,
    answerContentId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'answer_type',
  });
  return answer_type;
};