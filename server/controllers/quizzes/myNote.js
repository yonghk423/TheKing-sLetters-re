const { quiz, user, user_quiz, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models')
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(!accessTokenData) {
    res.status(404).send("you have to login")
  } else {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    const inMyNote = await user_quiz.findAll({
      where: { userId: userData.id }
    })

    const myNotesList = [];
    inMyNote.map((myNote) => {
      myNotesList.push(myNote.quizId)
    })

    const myNote = await quiz.findAll({
      include: [
        { model: category, attributes: ["id", "category"] },
        { model: quiz_type,
          include: [
            { model: quizContent, attributes: ["id", "quizType", "quizCode"] }
          ],
          attributes: ["id", "quizId", "quizContentId"]
        },
        { model: answer_type,
          include: [
            { model: answerContent, attributes: ["id", "answerType", "answerCode"] }
          ],
          attributes: ["id", "quizId", "answerContentId"]
        }
      ],
      attributes: ["id", "title", "thumbnail", "rewardPoint", "heart" ],
      where: { id: myNotesList }
    })

    // const myNoteList = [];
    // quizzes.map((quiz) => {
    //   myNoteList.push({
    //     id: quiz.id,
    //     title: quiz.title,
    //     thumbnail: quiz.thumbnail,
    //     rewardPoint: quiz.rewardPoint,
    //     heart: quiz.user_recommend_quizzes.length,
    //     category: quiz.categories[0].category,
    //     quizType: quiz.quiz_types[0].quizContent.quizType,
    //     answerType: quiz.answer_types[0].answerContent.answerType
    //   })
    // })

    const sendUserData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      image: userData.image
    }

    if(myNote.length <= 0) {
      res.status(200).json({ data: { userData: sendUserData, myNote } })
    }

    let n = myNote.length-1
    let m = myNote.length-1

    for(let i=0; i<=m/2; i++) {
      let temp = myNote[i];
      myNote[i] = myNote[n]
      myNote[n] = temp
      n--
    }

    res.status(200).json({ data: { userData: sendUserData, myNote } })
  }
}
