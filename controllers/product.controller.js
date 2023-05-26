const { getProductsServices, createProductServices } = require("../services/product.services");



exports.getProduct = async (req, res, next) => {
  try {
    

    const result = await getProductsServices()

    res.status(200).json({
      message: "Data found",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      message: "some went wrong",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  // data insert kora jayi duti method e : save & create
  try {
  
  const result = await createProductServices(req.body)
    res.status(200).json({ status: "success", message: "data update done" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};