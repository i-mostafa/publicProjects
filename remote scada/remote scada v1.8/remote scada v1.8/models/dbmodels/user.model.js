const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  role: { type: String },
  creationDate: {
    type: String,
    default: Date.now(),
  },
  lastLogin: { type: String },
});

module.exports = mongoose.model("user", UserSchema);
