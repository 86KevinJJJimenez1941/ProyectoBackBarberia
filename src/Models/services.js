const mongoose = require("mongoose");

const ServicesSchemma = new mongoose.Schema({
  identification_number: {
    type: Number,
    unique: false, // Modificado para permitir valores duplicados
  },
  type_service: {
    type: String,
    required: true,
    unique: false, // Modificado para permitir valores duplicados
  },
  price: {
    type: Number,
    required: true,
    unique: false, // Modificado para permitir valores duplicados
  }
});

const Services = mongoose.model("coll_services", ServicesSchemma);

module.exports = Services;
