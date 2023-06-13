const { getSupplierService, createSupplierService } = require("../services/supplier.service")

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).send({
      message: "some thing went wrong",
      error: error.message,
    });
  }
};

exports.getSupplier = async (req, res, next) => {
    try {
        const result = await getSupplierService()
        
        res.status(200).json({status:'success', data:result})
    } catch (error) {
        res.status(400).send({
            message: 'some thing went wrong',
            error:error.message
        })
        
    }
}