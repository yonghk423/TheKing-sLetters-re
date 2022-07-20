const { item } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = adminAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).send("not admin")
  } else {
    const { company, itemName, cost, itemImage, deadline } = req.body

    const itemList = await item.findAll()

    const createItem = async () => {
      const makeBarcode = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      const newBarcode = makeBarcode(1, 999999999999)
  
      const existBarcode = []
      itemList.map((item) => {
        existBarcode.push(item.barcodeNum)
      })
  
      if(!existBarcode.includes(newBarcode)) {
        const created = await item.create({
          company: company,
          itemName: itemName,
          barcodeNum: String(newBarcode),
          cost: cost,
          itemImage: itemImage,
          deadline: deadline
        })
    
        res.status(200).json({ data: { created } })
      } else {
        createItem()
      }
    }
    createItem()
  }
}
