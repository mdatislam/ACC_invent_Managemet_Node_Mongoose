const {
  getProductsServices,
  createProductServices,
  updateProductService,
  updateBulkProductService,
  deleteProductServiceById,
  deleteBulkProductService,
} = require("../services/product.services");



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

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    //console.log(id)
    const result= await updateProductService(id,req.body)
    res.status(200).json({ status: "success", message: "data update done" });

  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
    
  }
  
}

exports.updateBulkProduct = async (req, res, next) => {
  try {
    
    const result = await updateBulkProductService(req.body)
    res.status(200).json({ status: "success", message: "data update done" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id)
    const result = await deleteProductServiceById(id);
    if (!result.deletedCount) {
      res.status(500).send(" product not found");
    }
    res.status(200).json({ status: "success", message: "data delete successfully " });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

exports.deleteBulkProduct = async (req, res, next) => {
  try {
    const result = await deleteBulkProductService(req.body.ids);

    if (!result.deletedCount) {
      res.status(500).json({
        status: fail,
        error:"Could not deleted the product"
      });
    }
    res.status(200).json({ status: "success", message: "data delete successfully done" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
}