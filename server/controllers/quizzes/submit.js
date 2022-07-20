const { quiz, user, user_clearQuiz, answer_type, answerContent, mileage } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const { quizId, answer } = req.body
  
  const selectedQuiz = await quiz.findOne({
    where: { id: quizId, valid: true }
  })

  if(selectedQuiz && quizId && answer) {
    const quizAnswer = await answer_type.findOne({
      where: { quizId: quizId }
    })

    const realAnswer = await answerContent.findOne({
      where: { id: quizAnswer.answerContentId }
    })

    const cookie = req.cookies.accessToken

    if(!cookie && realAnswer.correctAnswer === answer) {
      res.status(200).json({ message: "correct answer! wanna signup?", comment: realAnswer.answerComment })
    } else if(!cookie && realAnswer.correctAnswer !== answer) {
      res.status(200).json({ message: "incorrect answer!", comment: realAnswer.answerComment })
    }

    const accessTokenData = isAuthorized(req, res);

    const data = await accessTokenData
    .then(user => { return user })

    const outUserData = await user.findOne({
      include: [
        { model: user_clearQuiz, attributes: ["quizId"] }
      ],
      where: { email: data.email }
    })

    const clearedList = []
    outUserData.user_clearQuizzes.map((quiz) => {
      clearedList.push(quiz.quizId)
    })

    const isPublished = await quiz.findOne({
      where: { id: quizId }
    })
    .then((quiz) => {
      return quiz.userId === outUserData.id
    })

    const isCleared = clearedList.includes(quizId)

    if(realAnswer.correctAnswer === answer && outUserData && !isCleared && !isPublished) {
      const point = selectedQuiz.rewardPoint

      if(!accessTokenData) {
        res.status(404).send("you have to login")
      } else {
        const data = await accessTokenData
        .then(user => { return user })
        const userData = await user.findOne({
          include: [
            { model: mileage, attributes: ["id", "mileage"] }
          ],
          where: { email: data.email }
        })
        .then((user) => {
          user.mileages[0].increment('mileage', { by: point });
        })

        await user_clearQuiz.create({
          quizId: quizId,
          userId: outUserData.id
        })

        res.status(200).json({ message: "correct answer!", comment: realAnswer.answerComment })
      }
    } else if(realAnswer.correctAnswer === answer && outUserData && isPublished) {
      res.status(200).json({ message: "correct answer! but can't gain point(publish)", comment: realAnswer.answerComment })
    } else if(realAnswer.correctAnswer === answer && outUserData && isCleared) {
      res.status(200).json({ message: "correct answer! but can't gain point(cleared)", comment: realAnswer.answerComment })
    } else if(realAnswer.correctAnswer !== answer && outUserData && !isCleared) {

      await user_clearQuiz.create({
        quizId: quizId,
        userId: outUserData.id
      })

      res.status(200).json({ message: "incorrect answer!", comment: realAnswer.answerComment })
    } else {
      res.status(200).json({ message: "incorrect answer!", comment: realAnswer.answerComment })
    }
  } else {
    res.status(404).send("there is no quiz")
  }
}

