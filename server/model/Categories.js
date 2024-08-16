const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true },
});

exports.Categories = mongoose.model("categories", categoriesSchema);
