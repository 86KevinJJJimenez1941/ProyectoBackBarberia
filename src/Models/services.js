const mongoose = require("mongoose");

const ServicesSchemma = new mongoose.Schema({
  identification_number: {
    type: Number,
    unique: false,
  },
  type_service: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  }
});

const Services = mongoose.model("coll_services", ServicesSchemma);

module.exports = Services;
