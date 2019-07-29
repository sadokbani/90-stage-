const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors= require('cors');
const commercantsRoutes = require("./routes/commercants");
const usersRoutes = require("./routes/users");

const historiqueRoute = require("./routes/historique.route");
const paysRoute = require ("./routes/pays");
const categoriesRoute = require('./routes/categorie.route');
const souscategoriesRoute = require('./routes/souscategorie.route');
const commentairesRoute = require('./routes/commentaires');
const app = express();

mongoose.connect("mongodb://localhost:27017/stage").then(
  () => {
    console.log('connected to database');
  })
  .catch(
    () => {
      console.log('connected failed');
    });

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/commercant", commercantsRoutes);
app.use("/user", usersRoutes);
app.use('/categorie', categoriesRoute);
app.use('/souscategorie', souscategoriesRoute);
app.use('/pays' , paysRoute);
app.use('/historique', historiqueRoute);
app.use('/commentaire',commentairesRoute);
module.exports = app;
