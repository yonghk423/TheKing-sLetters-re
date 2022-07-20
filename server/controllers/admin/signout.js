const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
console.log(req)
  res.status(200).clearCookie('adminToken').json({ data: { message: 'successfully signed out!' } })
};
