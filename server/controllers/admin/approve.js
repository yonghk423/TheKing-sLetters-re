const { quiz } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const { quizzes } = req.body
  const accessTokenData = adminAuthorized(req, res);
console.log(req.body)
  if(!accessTokenData) {
    res.status(404).send("not admin")
  } else {
    const quizList = await quiz.findAll({
      where: { id: quizzes }
    })

    quizList.map((quiz) => {
      quiz.update({ valid: true })
    })

    res.status(200).json({ message: "completely approved" })
  }
}
