const express = require("express");
const cors = require("cors");

const bcrypt = require("bcrypt")
const app = express();
const port = 3000;
require("./db.js");

app.use(express.json());
app.use(cors());

const User = require("./Models/Users");
const Services = require("./Models/services.js");
const saltRounds = 10

app.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({
      $or: [
        { username: userData.username },
        { email: userData.email }
      ]
    });

    if (existingUser) {
      return res.status(404).json({
        error: "El usuario ya existe",
        status: 404,
        creado: false
      });
    }

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      identification_number: userData.identification_number,
      password: hashedPassword,
      phone_number: userData.phone_number,
    });

    const savedUser = await newUser.save();

    res.json({
      message: "Usuario creado correctamente en la base de datos",
      status: 200,
      creado: true
    });
  } catch (error) {
    console.log("erros", error.message)
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!email || !password) {
      return res.status(400).json({ error: "Correo electrónico y contraseña son obligatorios" });
    }
    
    if(email === "adminUno@gmail.com"){
      console.log("Bienvenido administrador")
      res.json({ message: "Inicio de sesión exitoso", tipoUsuario: "Bienvenido administrador" });
    }

    if (!user) {
      return res.status(401).json({ error: "Correo electrónico o contraseña incorrectos" });
    }

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Correo electrónico o contraseña incorrectos" });
    }

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
});

app.post("/user/services/guardado", async (req, res) => {
  try {
    const { identification_number, type_service, price } = req.body;

    const newService = new Services({
      identification_number,
      type_service,
      price
    });

    const savedService = await newService.save();

    res.json({ message: "Registro de servicio exitoso", service: savedService });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error al registrar el servicio" });
  }
});

app.get("/user/services/stats", async (req, res) => {
  try {
    const { identification_number } = req.query;

    if (!identification_number) {
      return res.status(400).json({ error: "Se requiere el parámetro 'identification_number' en la consulta" });
    }

    const services = await Services.find({ identification_number: identification_number });

    res.json({ services });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al realizar la consulta en la base de datos" });
  }
});


module.exports = { app, port };
