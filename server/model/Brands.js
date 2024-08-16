const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandsSchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true },
});

exports.Brands = mongoose.model("brands", brandsSchema);
