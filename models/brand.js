const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId}= mongoose.Schema.Types


// brand schema

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide a brand name'],
        trim: true,
        lowercase: true,
        maxLength: 100,
        unique:true,   
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, 'please give a valid email'],
       
    },
    website: {
        type: String,
        validate:[validator.isURL,'please provide a valid url']
    },
    location: String,
    products: [{
        type: ObjectId,
        ref:"Product"
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref:"Supplier"
        },
        status: {
            type: String,
            enum: ['active', 'in-active'],
            default:active
        }
    }]
    
}, {
    timeStamps:true
})

// Model
const Brand = mongoose.model('Brand', brandSchema)

module.exports=Brand