const { user, quiz, user_quiz } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const quizId = req.body.quizId
  const accessTokenData = isAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).send("you have to login")
  } else {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    const exist = await user_quiz.findOne({
      where: { userId: userData.id, quizId: Number(quizId) }
    })
    
    if(exist) {
      await user_quiz.destroy({
        where: { userId: userData.id, quizId: Number(quizId) }
      })

      res.status(200).send("successfully deleted")
    }
  }
}