'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { user, user_usedItem, usedItem, quiz, quizContent, quiz_type, mileage, item, category, answerContent, answer_type, admin, user_quiz, user_clearQuiz, user_recommend_quiz } = sequelize.models;

mileage.belongsTo(user);
user.hasMany(mileage);

category.belongsTo(quiz);
quiz.hasMany(category);

quiz_type.belongsTo(quiz);
quiz.hasMany(quiz_type);

quiz_type.belongsTo(quizContent);
quizContent.hasMany(quiz_type);

answer_type.belongsTo(quiz);
quiz.hasMany(answer_type);

answer_type.belongsTo(answerContent);
answerContent.hasMany(answer_type);

quiz.belongsTo(user);
user.hasMany(quiz);

user.belongsTo(quiz);
quiz.hasMany(user);

user_usedItem.belongsTo(user);
user.hasMany(user_usedItem);

user_usedItem.belongsTo(usedItem);
usedItem.hasMany(user_usedItem);

user_quiz.belongsTo(user);
user.hasMany(user_quiz);

user_quiz.belongsTo(quiz);
quiz.hasMany(user_quiz);

user_clearQuiz.belongsTo(user);
user.hasMany(user_clearQuiz);

user_clearQuiz.belongsTo(quiz);
quiz.hasMany(user_clearQuiz)

user_recommend_quiz.belongsTo(user);
user.hasMany(user_recommend_quiz);

user_recommend_quiz.belongsTo(quiz);
quiz.hasMany(user_recommend_quiz);

module.exports = db;
