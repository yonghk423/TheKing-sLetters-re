const { admin, quiz, user_quiz, user_clearQuiz, user_recommend_quiz, category, quiz_type, quizContent, answer_type, answerContent } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const { quizId } = req.body
  const accessTokenData = adminAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).send("not admin")
  } else {
    const quizExist = await quiz.findOne({
      where: { id: quizId }
    })
    
    if(!quizExist) {
      res.status(404).send("quiz not exist")
    } else {
      const quizType = await quiz_type.findAll({
        include: [
          { model: quizContent }
        ],
        where: { quizId: quizId }
      })
  
      quizType.map( async (quizType) => {
        await quizContent.destroy({
          where: { id: quizType.quizContentId }
        })
      })
  
      const answerType = await answer_type.findAll({
        include: [
          { model: answerContent }
        ],
        where: { quizId: quizId }
      })
  
      answerType.map( async (answerType) => {
        await answerContent.destroy({
          where: { id: answerType.answerContentId }
        })
      })
  
      await quiz.destroy({
        where: { id: quizId }
      })

      res.status(200).send("successfully deleted")
    }
  }
}
