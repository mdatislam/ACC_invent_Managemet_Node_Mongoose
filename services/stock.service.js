const Stock = require("../models/stock")

exports.getStockService = async () => {
            
    const result = await Stock.aggregate([
      { $match: {} },
      { $project: { store: 1, quantity: 1, price: 1 } },
      { $group: { _id: "$store.name",totalProductPrice:{$sum:{$multiply:['$price','$quantity']}} } },
    ]);
    return result
}

exports.createStockService = async (data) => {
    const result = await Stock.create(data)
    return result
}