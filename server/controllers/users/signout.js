const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  res.status(200).clearCookie('accessToken').json({ data: { message: 'successfully signed out!' } })
};
