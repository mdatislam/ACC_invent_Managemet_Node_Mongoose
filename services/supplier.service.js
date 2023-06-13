const Supplier = require("../models/supplier")

exports.createSupplierService = async (data) => {
    const supplier = await Supplier.create(data)
    return supplier
}

exports.getSupplierService = async (data) => {
    const result = await Supplier.find({})
    return result
}