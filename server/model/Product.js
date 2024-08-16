const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [1, "Discount must be greater than 0"],
    max: [100, "Discount must be less than 100"],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
    max: [5, "Rating must be less than 5"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock must be greater than 0"],
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean },
});

const virtual = productSchema.virtual("id");

virtual.get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("products", productSchema);
