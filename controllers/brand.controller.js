const {
  getBrandService,
  createBrandService,
  updateBrandService,
  getBrandServiceById,
} = require("../services/brand.service");

exports.getBrand = async (req, res, next) => {
    try {
        const result = await getBrandService()
        res.status(200).json({ status:'success', data: result})
    } catch (error) {
        res.status(400).send({
            message: 'something went wrong',
            error:error.message
        })
        
    }
}

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
    
    try {
      const {id}=req.params
    const result = await getBrandServiceById();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};


exports.updateBrand = async (req, res, next) => {
    try {
      const {id}=req.params
        const result = await updateBrandService(id);
              
    res.status(200).json({ status: "success", message:'Data successfully update'  });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};