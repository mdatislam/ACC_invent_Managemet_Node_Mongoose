const Stock = require("../models/stock")

exports.getStockService = async () => {
    const result = await Stock.find({})
    return result
}

exports.createStockService = async (data) => {
    
}