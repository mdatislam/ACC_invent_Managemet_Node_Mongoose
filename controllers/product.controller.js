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
    /* query item ke separate korar tric  start */
    let filter = { ...req.query };
    //console.log("first", filter);
    const excludeFields = ["sort", "limit", "page","fields"];
    excludeFields.forEach((field) => delete filter[field]);

    /* query oprerator er sathe $ sing add korar trics  start */
    let filterString = JSON.stringify(filter);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte|neq|eq)\b/g,
      (match) => `$${match}`
    );
    //console.log(filterString);
    filter = JSON.parse(filterString);

    /* query operator er sathe $ sing add korar trics  end */

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    // select item separation..
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    /* query item ke separate korar tric  end */

    /* pagination start */
    if (req.query.page) {
      const { page=1, limit=3 } = req.query
      const skip = (page - 1) * (+limit)
      queries.skip = skip
      queries.limit=parseInt(limit)
      }
    /* pagination start */

    const result = await getProductsServices(filter, queries);

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

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.file)

    /* for multiple file uploaded we found ***req.files***
      */
  } catch (error) {
    
  }
}