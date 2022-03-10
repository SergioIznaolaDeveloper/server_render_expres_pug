const express = require("express");
const http = require("http"); // importando modulo npm (librería)
const env = require("dotenv").config(); //archivo para proteger contraseñas
const bodyParser = require("body-parser");
const request = require("request");
const app =
  express(); /*inicializar el servidor - APP es un ojeto que representa el server*/
const port = 3000; /*especificar el puerto*/
app.use(express.json());
/*motor de vistas pug*/
app.set("view engine", "pug");
app.set("views", "./views");

/*indica la carpeta de los archivos státicos que se vuelca en sources*/
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
const fetch = require("node-fetch");

app.get("/films/:title?", async (req, res) => {
  if (req.params.id) {
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/${req.params.id}`
      ); //{}
      let products = await response.json(); //{}
      res.render("films", { films: [products] }); // Pinta datos en el pug
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
  } else {
    try {
      let response = await fetch(`https://fakestoreapi.com/products`); // []
      let products = await response.json(); // []
      res.render("films", { products }); // Pinta datos en el pug
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
  }
});

/*MODULOS EXTERNOS*/
app.get("/", (req, res) => {
  res.render("home.pug");
});

/*funcion de callback, lanza el mensaje cuando consigue conectarse*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
