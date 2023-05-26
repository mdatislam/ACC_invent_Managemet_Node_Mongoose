const Product = require("../models/Product");

exports.getProductsServices = async () => {

    const products = await Product.find({});
    return products
  /*  or operator using */

  // const result = await Product.find({
  //   $or: [{ _id: "646b97f664bb0a5274b89b37" },{name:"caall"}],
  // });

  /* not equal operator using */

  // const result = await Product.find({
  //   status: {
  //   $eq:"out-of-stock"
  //   }
  // });

  /* gater then operator use */

  // const result = await Product.find({
  //   quantity: { $gt: 100 },
  // });

  /* In  operator use */

  // const result = await Product.find({
  //   name: {
  //     $in: ["call", "Dall"],
  //   },
  // });

  /* projection */

  /// const result = await Product.find({}, "name quantity -_id");

  /* alternative projection */
  //const result = await Product.find({}).select({ name: 1 });

  /* mongoose er convenient chaining way */
//   const products = await Product.where("name")
//     .equals(/\w/)
//     .where("quantity")
//     .gt(100)
//     .lt(700)
//     .limit(10)
//     .sort({ name: 1 });
//   return products;
};


exports.createProductServices = async (data) => {
  //save Method: instance create---> do somethings --> save
  // const product = new Product(req.body);

  // if (product.quantity == 0) {
  //   product.status="out-of-stock"
  // }
  // const result = await product.save();

  // method push korar jonno
  //result.logger();
  // create Method
  const newProduct = await Product.create(data);
  return newProduct;
}
