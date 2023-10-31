const mongoose = require("mongoose");

async function connection() {
  try {
    const dbName = "BarberiaKevin";
    await mongoose.connect(
      `mongodb+srv://kevin:kevin@atlascluster.d7pjldm.mongodb.net/${dbName}?retryWrites=true&w=majority`

    );
    console.log("Base de datos Mongo conectada");
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

module.exports = { connection };
