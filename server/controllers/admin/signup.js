const { admin } = require('../../models');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { name, email, password, mobile, gender } = req.body

  if(!name || !email || !password || !mobile || !gender) {
    res.status(422).send('필수 항목을 모두 채워주세요.')
  }

  const salt = Math.round((new Date().valueOf() * Math.random())) + "";
  const hashedPassword = crypto.createHash("sha512").update(password + salt).digest("hex");

  const overlap = await admin.findOne({
    where: { email: email }
  })

  if(overlap) {
    res.status(409).send('이미 존재하는 이메일입니다.')
  } else {
    const newUser = await admin.create({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      gender: gender,
      image: req.body.image || "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
      salt: salt
    })

    const adminData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      gender: newUser.gender,
      image: newUser.image,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }

    // res.cookie('accessToken', accessToken)
    res.status(201)
    .json({ data: { adminData: adminData }});
    // 유저 정보, 토큰 전달
  }
};
