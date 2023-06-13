const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types;


const supplierSchema = mongoose.Schema(
    {
         name: {
      type: String,
      trim: true,
      required: [true, "Please provide a supplier name"],
      lowercase: true,
      },
   
        description: String,
        email: {
            type: String,
            validate: [validator.isEmail, 'please provide a valid email'],
            trim: true,
            lowercase:true
        },
        brand: {
            name: {
                type: String,
                trim: true,
                required:true
            },
            id: {
                type: ObjectId,
                required:true,
                ref:'Brand'
            }
        },
        contactNumber: [{
            type: String,
            required: [true, 'please provide contact number'],
            validate: {
                validator: (value) => {
                    return validator.isMobilePhone(value)
                },
                message:'{VALUE} is not valid Number '
            }
        }],
        tradeLicenceNumber: {
            type: Number,
            //required:[true,'please provide a valid Licence num']
        },
        presentAddress: {
            type: String,
            required:true
        },
        location: {
            type: String,
            required: true,
            lowerCase: true,
            enum: {
                values: ['Dhaka', 'Cottogram', 'rangpur'],
                message:'{VALUE} is not accurate location'
            }
        },
        imageUrl: {
            type: String,
            validate:[validator.isURL ,'please provide a valid Url']
        },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    
  },
  {
    timestamps: true,
    
})

const Supplier = mongoose.model('Supplier', supplierSchema)
module.exports=Supplier