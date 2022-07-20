const { user, quiz, user_quiz, user_clearQuiz, user_recommend_quiz, category, quiz_type, quizContent, answer_type, answerContent } = require('../../models')
const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const quizId = req.query.quizid;
  const accessTokenData = isAuthorized(req, res);
console.log(req.query)
  if(!accessTokenData) {
    res.status(404).send("please login")
  } else {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })
console.log(quizId)
    const quizExist = await quiz.findOne({
      where: { id: quizId, userId: userData.id }
    })

    if(!quizExist) {
      res.status(400).send("you don't have permission")
    } else {
      const quizType = await quiz_type.findOne({
        include: [
          { model: quizContent }
        ],
        where: { quizId: quizId }
      })
  
      await quizContent.destroy({
        where: { id: quizType.quizContentId }
      })
  
      const answerType = await answer_type.findOne({
        include: [
          { model: answerContent }
        ],
        where: { quizId: quizId }
      })
  
      await answerContent.destroy({
        where: { id: answerType.answerContentId }
      })
  
      await quiz.destroy({
        where: { id: quizId }
      })

      res.status(200).send("successfully deleted")
    }
  }
}
