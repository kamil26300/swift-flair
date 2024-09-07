const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
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
  tags: { type: [String] },
  brand: { type: String, required: true },
  sku: { type: String },
  weight: { type: String },
  dimensions: {
    type: Object,
    properties: {
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
      depth: {
        type: Number,
      },
    },
  },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: {
    type: [Object],
    properties: {
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      date: {
        type: String,
      },
      reviewerName: {
        type: String,
      },
      reviewerEmail: {
        type: String,
      },
    },
  },
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: {
    type: Object,
    properties: {
      createdAt: {
        type: String,
      },
      updatedAt: {
        type: String,
      },
      barcode: {
        type: String,
      },
      qrCode: {
        type: String,
      },
    },
  },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
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
