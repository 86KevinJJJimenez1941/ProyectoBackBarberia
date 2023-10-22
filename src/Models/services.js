const mongoose = require("mongoose");

const ServicesSchemma = new mongoose.Schema({
  identification_number: {
    type: Number,
    required: true,
    unique: true,
  },
  type_service: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    unique: true,
  }
});

const Services = mongoose.model("coll_services", ServicesSchemma);

module.exports = Services;
