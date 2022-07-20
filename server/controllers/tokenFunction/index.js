require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
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

    return sign(userData, process.env.ACCESS_SECRET, {expiresIn: '3d'});
  },
  sendAccessToken: (req, res, userData, accessToken) => {
    res.status(200).cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      sameSite: 'None',
      httpOnly: true,
      secure: true
    }).json({ data: { userData: userData, accessToken: accessToken }});
    // res.status(200).json({ data: { userData: userData, accessToken: accessToken } });
  },
  isAuthorized: async (req, res) => {
    const cookie = req.cookies.accessToken
    if(cookie) {
      console.log(cookie)
      try {
        const accessToken = verify(cookie, process.env.ACCESS_SECRET);
        return accessToken
      } catch {
        res.status(400).send('사용 권한이 없습니다. 다시 로그인해주세요.')
      }

      return accessToken
    } else {
      try {
        const header = req.headers.authorization;
        const accessToken = header.split(' ')[1];
        try {
          const verified = verify(accessToken, process.env.ACCESS_SECRET);
          return verified
        } catch {
          res.status(404).json({ message: '사용 권한이 없습니다. 다시 로그인해주세요.' })
        }
      } catch {
        res.status(404).send('인증 토큰이 존재하지 않습니다.')
      }
    }
  },
  adminAuthorized: async (req, res) => {
    const cookie = req.cookies.adminToken
    if(cookie) {
      console.log(cookie)
      try {
        const accessToken = verify(cookie, process.env.ADMIN_SECRET);
        return accessToken
      } catch {
        res.status(400).send('사용 권한이 없습니다. 다시 로그인해주세요.')
      }

      return accessToken
    } else {
      try {
        const header = req.headers.authorization;
        const accessToken = header.split(' ')[1];
        try {
          const verified = verify(accessToken, process.env.ADMIN_SECRET);

          return verified
        } catch {
          res.status(404).send('사용 권한이 없습니다. 다시 로그인해주세요.')
        }
      } catch {
        res.status(404).send('인증 토큰이 존재하지 않습니다.')
      }
    }
  }
};

