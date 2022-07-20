const { item, user, mileage, usedItem, user_usedItem } = require('../../models')
const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  const { itemData, quantity } = req.body

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ],
      where: { email: data.email }
    })

    if(itemData.length <= 0) {
      res.status(202).send("please select some items")
    }
    const itemIdList = [];
    await item.findAll({
      attributes: ["id"]
    })
    .then((itemList) => {
      itemList.map((item) => {
        itemIdList.push(item.id)
      })
    })
    
    itemData.map((itemId) => {
      if(!itemIdList.includes(itemId)){
        res.status(202).send("item dosen't exist")
      }
    })

    const purchasedItems = await item.findAll({
      where: { id: itemData }
    })

    let overallPrice = 0
    purchasedItems.map((item) => {
      overallPrice += item.cost
    })



    if(!purchasedItems) {
      res.status(202).send("item dosen't exist")
    }else if (userData.mileages[0].mileage >= overallPrice) {
      itemData.map( async (itemId) => {

        const purchasedItem = await item.findOne({
          where: { id: itemId }
        })

        const createdUsedItem = await usedItem.create({
          company: purchasedItem.company,
          itemName: purchasedItem.itemName,
          barcodeNum: purchasedItem.barcodeNum,
          cost: purchasedItem.cost,
          itemImage: purchasedItem.itemImage,
          deadline: purchasedItem.deadline
        })
    
        await user_usedItem.create({
          userId: userData.id,
          usedItemId: createdUsedItem.id
        })
    
        await item.destroy({
          where: { id: itemId }
        })
    
        await user.findOne({
          include: [
            { model: mileage, attributes: ["id", "mileage"] }
          ],
          where: { email: data.email }
        })
        .then((user) => {
          user.mileages[0].decrement('mileage', { by: purchasedItem.cost });
        })
      })

      res.status(200).send("successfully purchased")
    } else {
      res.status(202).send("not enough point")
    }


  } else {
    res.status(401).send('invalid accessToken')
  }
}
