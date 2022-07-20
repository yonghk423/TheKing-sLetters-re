const { user, quiz, user_quiz } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const { quizId } = req.body
  const accessTokenData = isAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).send("you have to login")
  } else {

    const quizExist = await quiz.findOne({
      where: { id: quizId }
    })
  
    if(!quizExist) {
      res.status(404).send("there is no quiz")
    }

    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })
    
    const existMyNote = await user_quiz.findOne({
      where: { userId: userData.id, quizId: Number(quizId) }
    })

    if(!existMyNote) {
      const newMyNote = await user_quiz.create({
        userId: userData.id,
        quizId: Number(quizId)
      })
    
      res.status(200).send("successfully added")
    } else {
      res.status(409).send("already in your my note")
    }
  }
}