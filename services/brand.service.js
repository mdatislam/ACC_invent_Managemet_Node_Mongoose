const Brand = require('../models/brand')


exports.getBrandService = async () => {
    const brands = await Brand.find({}).populate("products").select({brand:"name"})
    return brands
}

exports.createBrandService = async (data) => {
  const brands = await Brand.create(data);
  return brands;
};

exports.updateBrandService = async (id,updateInfo) => {
    const result = await Brand.updateOne({ _id: id }
        , updateInfo, { runValidators: true });
    
  return result;
};

exports.getBrandServiceById = async () => {
  const brands = await Brand.findOne({});
  return brands;
};