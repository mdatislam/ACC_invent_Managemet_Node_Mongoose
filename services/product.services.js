const Product = require("../models/Product");

exports.getProductsServices = async () => {
  const products = await Product.find({});
  return products;
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
};

exports.updateProductService = async (productId, updateData) => {
  /* using updateOne Method */
  // const result = await Product.updateOne({ _id: productId }, { $set: updateData },{runValidators:true});

  /* using operator */

  const result = await Product.updateOne(
    { _id: productId },
    { $inc: updateData },
    { runValidators: true }
  );

  /* save Method */

  // const product = await Product.findById(productId) // fist product ti ke load kora
  // const result = await product.set(updateData).save() // then new value set kora at last save

  return result;
};

exports.updateBulkProductService = async (data) => {
  /* all update data are same */

  /*  sending data format :
  {
    "ids": [
        "646b97cb64bb0a5274b89b33",
        "646b97f664bb0a5274b89b37"
    ],
    "data":{
        "price":575
    }
} */

  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators:true
  // })

  /* if data is different for each ids */

  /* sending data format:
  {
    "ids": [
        {
            "id": "646b97cb64bb0a5274b89b33",
            "data": {
                "price": 1234
            }
        },
        {
            "id": "646b97f664bb0a5274b89b37",
            "data": {
                "price": 567
            }
        }
        ]
    } */
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);

  console.log(result);
  return result;
};

exports.deleteProductServiceById = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

exports.deleteBulkProductService = async (productIds) => {
  const result = await Product.deleteMany({ _id: productIds });
  //console.log(result)
  return result;
};
