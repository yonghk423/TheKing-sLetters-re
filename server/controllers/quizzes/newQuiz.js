const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category } = require('../../models')
const { isAuthorized } = require('../tokenFunction/index')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  const {title, categories, quizContents, quizTypes, rewardPoints, answerContents, answerCorrects, answerTypes, answerComments } = req.body;
  let { thumbnail } = req.body

  if(accessTokenData && title && categories && quizContents && quizTypes && rewardPoints && answerContents && answerCorrects && answerTypes && answerComments) {

    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    // 썸네일 카테고리별 default 설정
    if(thumbnail === "default") {
      if(categories === "정치") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776488054030336/001.png"
      } else if(categories === "경제") {
        thumbnail = "https://cdn.discordapp.com/attachments/894748673240629331/905653950043291698/005.png"
      } else if(categories === "사회") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776508018913320/002.png"
      } else if(categories === "스포츠") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776576771919872/003.png"
      } else if(categories === "정보기술") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776526901661747/010.png"
      } else if(categories === "관광") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776537228042270/004.png"
      } else if(categories === "요리") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776601119875092/006.png"
      } else if(categories === "여행") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776586670473247/007.png"
      } else if(categories === "음악") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776476565807124/008.png"
      } else if(categories === "외래어") {
        thumbnail = "https://cdn.discordapp.com/attachments/830706676852064307/901776498816589854/009.png"
      }
    }

      // quiz 테이블 생성
    const createdQuiz = await quiz.create({
      title: title,
      thumbnail: thumbnail,
      rewardPoint: rewardPoints,
      heart: 0,
      valid: true,
      userId: userData.id
    });

      // category 테이블 생성
    const createdCategory = await category.create({
      category: categories,
      quizId: createdQuiz.id
    });


    /* 
      quizContents: {
        constents: image_url: url,
        answerCorrects: num,
        answerTypes: string,
        categories: string
      }
    */

      // quizContent 테이블 생성
    const createdQuizContent = await quizContent.create({
      quizCode: quizContents.image_url || quizContents.text,
      quizType: quizTypes
    });

      // quiz_type 테이블 생성
    const createdQuiz_type = await quiz_type.create({
      quizContentId: createdQuizContent.id,
      quizId: createdQuiz.id
    });



    /* 
      answerContents: {
        constents: [

        ],
        answerCorrects: num,
        answerTypes: string,
        categories: string
      }
    */

      // answerContent, answer_tyoe 테이블 생성
    answerContents.map( async (answerExample) => {
      await answerContent.create({
        answerCode: answerExample.file_url || answerExample.name || answerExample.text,
        answerComment: answerComments,
        answerType: answerTypes,
        correctAnswer: answerCorrects
      })
      .then( async (created) => {
        await answer_type.create({
          answerContentId: created.id,
          quizId: createdQuiz.id
        })
      })
    })

    // res.status(201).redirect(`http://${req.get('host')}`)
    res.status(201).json(createdQuiz)
  } else {
    res.status(400).send("invalid accessToken")
  }
}

