const { user, mileage } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(!accessTokenData) {
    res.status(401).send('invalid accessToken')
  } else {
    const data = await accessTokenData
    .then(user => { return user })

    const originUserData = await user.findOne({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ],
      where: { email: data.email }
    })

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

        if(userList[mid].mileage === userData.mileages[0].mileage) {
          return mid+1;
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

    const userRanking = searchUser(lineupUserList, originUserData)

    if(originUserData) {
      const userData = {
        id: originUserData.id,
        name: originUserData.name,
        email: originUserData.email,
        mobile: originUserData.mobile,
        gender: originUserData.gender,
        image: originUserData.image,
        mileage: originUserData.mileages[0].mileage,
        rank: userRanking,
        createdAt: originUserData.createdAt,
        updatedAt: originUserData.updatedAt
      }

      res.status(200)
      .json({ data: { userData: userData } })
    } else {
      res.status(401).send('invalid user')
    }
  }
}

