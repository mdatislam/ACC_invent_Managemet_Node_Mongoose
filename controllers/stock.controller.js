const { getStockService, createStockService } = require("../services/stock.service")

exports.getStock = async (req, res, next) => {
    try {
        const result = await getStockService();
        res.status(200).json({status:'success', data:result});
    
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message:error.message
        })
    
  }
}

exports.createStock = async (req, res, next) => {
    try {
        const result =await createStockService(req.body)
    } catch (error) {
        
    }
}


