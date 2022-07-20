const { user, mileage } = require('../../models');
const crypto = require('crypto')
const { generateAccessToken, sendAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    include: [
      { model: mileage, attributes: ["mileage"] }
    ],
    where: { email: req.body.email }
  })

  if(!userInfo) {
    res.status(401).send('Invalid user')
  } else if(userInfo.verified === false) {
    res.status(400).send('please check your email')
  }

  const DBpassword = userInfo.password
  const inputPassword = req.body.password
  const salt = userInfo.salt
  const hashedPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(DBpassword === hashedPassword && userInfo.verified === true) {
    const accessToken = generateAccessToken(userInfo)

    const userList = await user.findAll({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ]
    })

    const unlineupRankList = []
    userList.map((user) => {
      if(user.name !== "unknown") {
        unlineupRankList.push({
          id: user.id,
          name: user.name,
          image: user.image,
          mileage: user.mileages[0].mileage
        })
      }
    })

    const lineupUser = (userList) => {
      for (let i=0; i<userList.length; i++) {
        let minIdx = i;
        for (let j=i+1; j<userList.length; j++) {
          if (userList[minIdx].mileage < userList[j].mileage) {
              minIdx = j
          } else if (userList[minIdx].id > userList[j].id && userList[minIdx].mileage === userList[j].mileage) {
            minIdx = j
          }
        }
        if (minIdx !== i) {
          let temp = userList[minIdx];
          userList[minIdx] = userList[i]
          userList[i] = temp
        }
      }
      return userList
    }

    const lineupUserList = lineupUser(unlineupRankList)

    const searchUser = (userList, userData) => {
      let left = 0;
      let right = userList.length - 1;

      while(left <= right) {
        let mid = parseInt((left + right) / 2)

        if(userList[mid].mileage === userData.mileages[0].mileage && userList[mid].id === userData.id) {
          return mid+1;
        }
        else if(userList[mid].mileage === userData.mileages[0].mileage && userList[mid].id !== userData.id) {
          if(userList[mid].id < userData.id) {
            left = mid + 1
          }
          else if(userList[mid].id > userData.id) {
            right = mid - 1
          }
        }
        else if(userList[mid].mileage > userData.mileages[0].mileage) {

          left = mid + 1;
        }
        else {
          right = mid - 1;
        }
      }
      return -1
    }

    const userRanking = searchUser(lineupUserList, userInfo)

    const userData = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      mobile: userInfo.mobile,
      gender: userInfo.gender,
      image: userInfo.image,
      mileage: userInfo.mileages[0].mileage,
      rank: userRanking,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt
    }

    sendAccessToken(req, res, userData, accessToken)
  } else {
    res.status(401).send('Invalid user or Wrong password')
  }
};

