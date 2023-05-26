const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middle wares

app.use(express.json());
app.use(cors());

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

// Query: posting route

app.post("/api/v1/product", async (req, res, next) => {

  // data insert kora jayi duti method e : save & create
  try {

    //save Method: instance create---> do somethings --> save
    const product = new Product(req.body);

    // if (product.quantity == 0) {
    //   product.status="out-of-stock"
    // }
    const result = await product.save();

    // method push korar jonno 
   result.logger()
    // create Method
   // const result = await Product.create(req.body)
    res
      .status(200)
      .json({ status: "success", message: "data update done", });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
});

// query route

app.get('/api/v1/product', async (req, res, next) => {
  try {
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

    const result = await Product.where("name").equals(/\w/)
      .where("quantity").gt(200).lt(700)
      .limit(2).sort({name:1});

    res.status(200).json({
      message: "Data found",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      message: "some went wrong",
      error:error.message
    })
  }
})

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
