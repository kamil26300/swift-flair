const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  name: { type: String, required: true },
  orders: { type: [Schema.Types.Mixed], required: true },
  addresses: {
    type: [Schema.Types.Mixed],
    required: true,
  },
});

const virtual = userSchema.virtual("id");

virtual.get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("users", userSchema);
