const { user } = require('../../models')
const crypto = require('crypto');

const firstKey=crypto.randomBytes(256).toString('base64').substr(50, 5);
const secondKey=crypto.randomBytes(256).toString('hex').substr(100, 5);
const verifyKey=firstKey+secondKey;

module.exports = async (req, res) => {
  const userData = await user.findOne({
    where: { verifyKey: req.query.key }
  })


  if(!userData) {
    res.status(400).send("invalid verify code")
  } else {
    await user.findOne({
      where: { verifyKey: req.query.key }
    })
    .then(user => {
      user.update({
        verified: true,
        verifyKey: verifyKey
      })
    })
    res.redirect(`https://thekingsletters.ml`)
  }
}
