const { user, quiz, user_recommend_quiz } = require('../../models')
const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const { quizId } = req.body
  const accessTokenData = isAuthorized(req, res);
  
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
  
  if (userData) {
    const exist = await user_recommend_quiz.findOne({
      where: { userId: userData.id, quizId: quizId }
    })
    
    if(!accessTokenData) {
      res.status(400).send("you have to login")
    } else if (accessTokenData && !exist) {

      const newRecommend = await user_recommend_quiz.create({
        userId: userData.id,
        quizId: Number(quizId)
      })

      await quiz.findOne({
        where: { id: quizId }
      })
      .then((quiz) => {
        quiz.increment('heart', { by: 1 });
      })
    
      res.status(200).send("add recommend")
    } else if (accessTokenData && exist) {
      await user_recommend_quiz.destroy({
        where: { userId: userData.id, quizId: Number(quizId) }
      })

      await quiz.findOne({
        where: { id: quizId }
      })
      .then((quiz) => {
        quiz.decrement('heart', { by: 1 });
      })

      res.status(200).send("cancel recommend")
    }
  }
}