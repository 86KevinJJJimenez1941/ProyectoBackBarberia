const mongoose = require("mongoose");

async function connection() {
  try {
    const dbName = "BarberiaKevin";
    await mongoose.connect(
      //`mongodb+srv://kevin:kevin@atlascluster.d7pjldm.mongodb.net/${dbName}?retryWrites=true&w=majority`
      `mongodb://mongo:gh2eBch3Cc--3HEBeFAG4e3DddHBGa5A@monorail.proxy.rlwy.net:11234`

    );
    console.log("Base de datos Mongo conectada");
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

module.exports = { connection };
