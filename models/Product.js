const mongoose = require("mongoose")
const {objectId}=mongoose.Schema.Types

// schema design

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "product name must be unique"],
      minLength: [3, "Name must be minimum 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pecs", "liter",'bags'],
        messages: "unit can't be {VALUE}, must be kg/pecs/liter",
      },
    },
   /*  quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "quantity must be an integer",
      },
    }, */
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-off-stock", "discontinue"],
        message: "status can't be {VALUE}",
      },
    },
    imageURLs: [{
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!Array.isArray(value)) {
            return false
          }  // check the value is Array or not
          let isValid= true
          value.forEach(ur => {
            if (!validator.isURL(value)) {
              isValid= false
            }
          })
          return isValid
        },
        message:'Please provide a valid image Url'
      }
    }],
    category: {
      type: String,
      required:true
    },
    brand: {
      name: {
        type: String,
        required: true,
        id: {
          type: objectId,
          ref: 'brand',
          required:true
        }
      }
    }

    
  },
  {
    timestamps: true,
  }
);

//mongoose middleware two types for save data: pre & post

productSchema.pre('save', function (next) {
  console.log('before save data')
  if (this.quantity == 0) {
    this.status="out-of-stock"
  }
  next()
})

productSchema.post('save', function (doc, next) {
  
  console.log("after save data");
  next();
})

// schema er vetore jekuno method inject  kora jay & seti abar pore route use kora jay
productSchema.methods.logger = function () {
  console.log(`data saved for ${this.name}`)
}

//Mongoose Pattern:   Schema -> model --> Query

// model
const Product = mongoose.model("Product", productSchema);

module.exports=Product