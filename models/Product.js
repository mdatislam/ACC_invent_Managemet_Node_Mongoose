const mongoose= require("mongoose")

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
    price: {
      type: Number,
      required: true,
      min: [0, "price should not  negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pecs", "liter"],
        messages: "unit can't be {VALUE}, must be kg/pecs/liter",
      },
    },
    quantity: {
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
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-off-stock", "discontinue"],
        message: "status can't be {VALUE}",
      },
    },
    // created: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    //     },

    // //How info embalmed

    // catagories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.ObjectId,
    //   },
    // ],
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