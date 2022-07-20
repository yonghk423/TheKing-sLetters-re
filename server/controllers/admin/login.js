const { admin } = require('../../models');
const { sign } = require('jsonwebtoken');
const crypto = require('crypto')

module.exports = async (req, res) => {
  const adminInfo = await admin.findOne({
    where: { email: req.body.email }
  })

  if(!adminInfo) {
    res.status(401).send('Invalid admin data')
  }

  const DBpassword = adminInfo.password
  const inputPassword = req.body.password
  const salt = adminInfo.salt
  const hashedPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(DBpassword === hashedPassword) {
    const generateAdminAccessToken = (data) => {
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        gender: data.gender,
        image: data.image,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
  
      return sign(userData, process.env.ADMIN_SECRET, {expiresIn: '3d'});
    }

    const accessToken = generateAdminAccessToken(adminInfo)

    const adminData = {
      id: adminInfo.id,
      name: adminInfo.name,
      email: adminInfo.email,
      mobile: adminInfo.mobile,
      gender: adminInfo.gender,
      image: adminInfo.image,
      createdAt: adminInfo.createdAt,
      updatedAt: adminInfo.updatedAt
    }

    res.status(200).cookie("adminToken", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      sameSite: 'None',
      httpOnly: true,
      secure: true,
    }).json({ data: { adminData: adminData, adminToken: accessToken }});
  } else {
    res.status(401).send('Invalid user or Wrong password')
  }
};
