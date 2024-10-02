const mongoose = require("mongoose");
const { Schema } = mongoose;

var date = new Date();
formattedDate = date.toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const orderSchema = new Schema({
  items: [{ type: Schema.Types.Mixed, required: true }],
  totalItems: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  totalCost: { type: Number, required: true },
  selectedPayment: { type: String, required: true },
  selectedAddress: {
    type: Object,
    properties: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      addId: {
        type: Number,
        required: true,
      },
    },
  },
  date: { type: Date, default: formattedDate },
  status: { type: String, default: "Pending" },
});

const virtual = orderSchema.virtual("id");

virtual.get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("orders", orderSchema);
