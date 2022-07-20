'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    socialId: DataTypes.STRING,
    supplier: DataTypes.STRING,
    salt: DataTypes.STRING,
    quizId: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    verifyKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
