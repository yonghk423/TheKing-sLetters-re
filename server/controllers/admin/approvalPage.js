const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = adminAuthorized(req, res);

  if (!accessTokenData) {
    res.status(404).send("not admin")
  } else {

    const invalidQuizList = await quiz.findAll({
      include: [
        { model: category, attributes: ["id", "category"] },
        { model: quiz_type,
          include: [
            { model: quizContent, attributes: ["id", "quizType", "quizCode"] }
          ],
          attributes: ["id", "quizId"]
        },
        { model: answer_type,
          include: [
            { model: answerContent, attributes: ["id", "answerType", "answerCode"] }
          ],
          attributes: ["id", "quizId"]
        }
      ],
      attributes: ["id", "title", "thumbnail", "rewardPoint", "heart"],
      where: { valid: false }
    })

    let n = invalidQuizList.length-1
    let m = invalidQuizList.length-1

    for(let i=0; i<=m/2; i++) {
      let temp = invalidQuizList[i];
      invalidQuizList[i] = invalidQuizList[n]
      invalidQuizList[n] = temp
      n--
    }

    // const invalidQuizList = [];
    // if(quizzes.length !== 0) {
    //   quizzes.map((quiz) => {
    //     invalidQuizList.push({
    //       id: quiz.id,
    //       title: quiz.title,
    //       thumbnail: quiz.thumbnail,
    //       rewardPoint: quiz.rewardPoint,
    //       heart: quiz.user_recommend_quizzes.length,
    //       category: quiz.categories[0].category,
    //       quizType: quiz.quiz_types[0].quizContent.quizType,
    //       answerType: quiz.answer_types[0].answerContent.answerType
    //     })
    //   })
    // }

    const validQuizList = await quiz.findAll({
      include: [
        { model: user, attributes: ["id", "email", "name"] },
        { model: user_recommend_quiz, attributes: ["userId"] }
      ],
      attributes: ["id", "title", "thumbnail", "heart"],
      where: { valid: true }
    })

    n = validQuizList.length-1
    m = validQuizList.length-1

    for(let i=0; i<=m/2; i++) {
      let temp = validQuizList[i];
      validQuizList[i] = validQuizList[n]
      validQuizList[n] = temp
      n--
    }

    // const validQuizList = [];
    // if(quizList.length !== 0) {
    //   quizList.map((quiz) => {
    //     validQuizList.push({
    //       id: quiz.id,
    //       title: quiz.title,
    //       thumbnail: quiz.thumbnail,
    //       userData: {
    //         id: quiz.user.id,
    //         email: quiz.user.email,
    //         name: quiz.user.name
    //       }
    //     })
    //   })
    // }

    res.status(200).json({ data: { invalidQuizList, validQuizList } })
  }
}
