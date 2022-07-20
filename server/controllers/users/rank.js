const { user, mileage } = require('../../models')

module.exports = async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;

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


  let rankList = lineupUser(unlineupRankList)

  if(offset && limit) {
    rankList = rankList.slice(offset, limit)
  }

  if(userList.length-1 <= limit) {
    res.status(200).json({ data: { rankList, message: "Done" } })
  }

  res.status(200).json({ data: { rankList } })
}
