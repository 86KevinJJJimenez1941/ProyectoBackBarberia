const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchemma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  identification_number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  }
});

const User = mongoose.model("coll_users", UserSchemma);

module.exports = User;
