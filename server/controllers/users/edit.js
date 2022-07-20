const { user } = require('../../models');
const crypto = require('crypto')
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })
    
    const userData = await user.findOne({
      where: { email: data.email }
    })

    if(req.body.name) {
      if(userData.name !== req.body.name) {
        await user.findOne({
          where: { email: userData.email }
        })
        .then(user => {
          user.update({name: req.body.name})
        })
      }
    }
 
    if(req.body.mobile) {
      if(userData.mobile !== req.body.mobile) {
        await user.findOne({
          where: { email: userData.email }
        })
        .then(user => {
          user.update({mobile: req.body.mobile})
        })
      }
    }

    if(req.body.image) {
      if(userData.image !== req.body.image) {
        await user.findOne({
          where: { email: userData.email }
        })
        .then(user => {
          user.update({image: req.body.image})
        })
      }
    }

    if(req.body.password) {
      const DBpassword = userData.password
      const inputPassword = req.body.password
      const salt = userData.salt
      const hashedPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

      if(DBpassword !== hashedPassword) {
        await user.findOne({
          where: { email: userData.email }
        })
        .then(user => {
          user.update({ password: hashedPassword })
        })
      }
    }

    let newUserData = {
      id: userData.id,
      name: req.body.name || userData.name,
      email: userData.email,
      mobile: req.body.mobile || userData.mobile,
      gender: userData.gender,
      image: req.body.image || userData.image,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    }

    // const accessToken = req.headers.cookie.split('=')[1].split(';')[0];
    const header = req.headers.authorization;
    const accessToken = header.split(' ')[1];

    // res.cookie('accessToken', accessToken);
    res.status(201)
    // .cookie('jwt', req.cookies.jwt)
    .json({ data: { userData: newUserData, accessToken: accessToken } })
  }
}
