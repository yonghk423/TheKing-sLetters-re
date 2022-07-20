const { user, quiz } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })

    const originUserData = await user.findOne({
      where: { email: data.email }
    })

    const madeQuiz = await quiz.findAll({
      where: { userId: originUserData.id },
      attributes: ["id", "thumbnail", "title"]
    })

    let n = madeQuiz.length-1
    let m = madeQuiz.length-1

    for(let i=0; i<=m/2; i++) {
      let temp = madeQuiz[i];
      madeQuiz[i] = madeQuiz[n]
      madeQuiz[n] = temp
      n--
    }

    const publish = {
      id: originUserData.id,
      name: originUserData.name,
      email: originUserData.email,
      mobile: originUserData.mobile,
      gender: originUserData.gender,
      image: originUserData.image,
      createdAt: originUserData.createdAt,
      updatedAt: originUserData.updatedAt
    }

    res.status(200)
    .json({ data: { madeQuiz } })
  } else {
    res.status(401).send('invalid accessToken')
  }
}
