const {
  createStoreService,
  getStoreService,
} = require("../services/store.service");

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body)
        console.log(result)
         res
           .status(200)
           .json({ status: "success", message: "Data successfully create" });
    } catch (error) {
       res.status(400).send({
         message: "something went wrong",
         error: error.message,
       }); 
    }
}

exports.getStore = async (req, res, next) => {
  try {
    const result = await getStoreService();
    console.log(result);
    res
      .status(200)
      .json({ status: "success", data:result });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};