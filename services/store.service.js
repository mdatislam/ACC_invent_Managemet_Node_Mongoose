const Store= require('../models/store')
exports.createStoreService = async (data) => {
  
    const store = await Store.create(data)
    return store
}

exports.getStoreService = async () => {
    const store = await Store.find({});
  return store;
};