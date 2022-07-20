const { quiz, user, mileage, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models');
const { verify } = require('jsonwebtoken')

module.exports = async (req, res) => {
  const id = req.query.quizid;

  if(req.cookies) {
    let adminVerified
    let userVerified

    try {
      const cookie = req.cookies.adminToken
      adminVerified = verify(cookie, process.env.ADMIN_SECRET);

      if(adminVerified) {
        const selectedQuiz = await quiz.findAll({
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
                { model: answerContent, attributes: ["id", "answerType", "answerCode", "answerComment"] }
              ],
              attributes: ["id", "quizId", "answerContentId"]
            },
            { model: user,
              include: [
                { model: mileage, attributes: ["id", "mileage"] }
              ],
              attributes: ["id", "name", "email", "image"]
            },
            { model: user_recommend_quiz, attributes: ["id", "userId"] }
          ],
          attributes: ["id", "title", "thumbnail", "rewardPoint", "heart", ],
          where: { id: id }
        })

        if(selectedQuiz.length === 0) {
          res.status(404).send("quiz does not exist")
        }

        res.status(200).json({ data: { selectedQuiz } })
      }
    } catch {
      if(req.cookies.accessToken) {
        const cookie = req.cookies.accessToken
        userVerified = verify(cookie, process.env.ACCESS_SECRET);

        const exist = await user_recommend_quiz.findOne({
          where: { userId: userVerified.id, quizId: id }
        })

        const selectedQuiz = await quiz.findAll({
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
                { model: answerContent, attributes: ["id", "answerType", "answerCode", "answerComment"] }
              ],
              attributes: ["id", "quizId", "answerContentId"]
            },
            { model: user,
              include: [
                { model: mileage, attributes: ["id", "mileage"] }
              ],
              attributes: ["id", "name", "email", "image"]
            },
            { model: user_recommend_quiz, attributes: ["id", "userId"] }
          ],
          attributes: ["id", "title", "thumbnail", "rewardPoint", "heart", ],
          where: { id: id, valid: true }
        })
  
        if(selectedQuiz.length === 0) {
          res.status(404).send("quiz does not exist")
        }

        if(exist) {
          res.status(200).json({ data: { selectedQuiz, recommended: true } })
        } else if(!exist) {
          res.status(200).json({ data: { selectedQuiz, recommended: false } })
        }
      } else {
        const selectedQuiz = await quiz.findAll({
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
                { model: answerContent, attributes: ["id", "answerType", "answerCode", "answerComment"] }
              ],
              attributes: ["id", "quizId", "answerContentId"]
            },
            { model: user,
              include: [
                { model: mileage, attributes: ["id", "mileage"] }
              ],
              attributes: ["id", "name", "email", "image"]
            },
            { model: user_recommend_quiz, attributes: ["id", "userId"] }
          ],
          attributes: ["id", "title", "thumbnail", "rewardPoint", "heart", ],
          where: { id: id, valid: true }
        })
  
        if(selectedQuiz.length === 0) {
          res.status(404).send("quiz does not exist")
        }
      
        res.status(200).json({ data: { selectedQuiz } })
      }
    }
  }

  const selectedQuiz = await quiz.findAll({
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
          { model: answerContent, attributes: ["id", "answerType", "answerCode", "answerComment"] }
        ],
        attributes: ["id", "quizId", "answerContentId"]
      },
      { model: user,
        include: [
          { model: mileage, attributes: ["id", "mileage"] }
        ],
        attributes: ["id", "name", "email", "image"]
      },
      { model: user_recommend_quiz, attributes: ["id", "userId"] }
    ],
    attributes: ["id", "title", "thumbnail", "rewardPoint", "heart", ],
    where: { id: id, valid: true }
  })

  if(selectedQuiz.length === 0) {
    res.status(404).send("quiz does not exist")
  }

  res.status(200).json({ data: { selectedQuiz } })
}
