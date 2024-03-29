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
const apiKey = process.env.API_KEY;

/*indica la carpeta de los archivos státicos que se vuelca en sources*/
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
const fetch = require("node-fetch");

app.get("/films/:title?", async (req, res) => {
  if (req.params.title) {
    try {
      let response = await fetch(
        `https://www.omdbapi.com/?t=${req.params.title}&apikey=${apiKey}`
      ); //{}
      let title = await response.json(); //{}
      res.render("films", { films: title }); // Pinta datos en el pug
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
  }
});
app.post("/", function (req, res) {
  let film = req.body.films;
  console.log(film);

  res.redirect(`http://localhost:3000/films/${film}`);
});

app.get("/", (req, res) => {
  res.render("home.pug");
});

/*funcion de callback, lanza el mensaje cuando consigue conectarse*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
