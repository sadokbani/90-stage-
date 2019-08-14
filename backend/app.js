const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


var cors= require('cors');
const commercantsRoutes = require("./controller/commercants");
const usersRoutes = require("./controller/users");
const historique_commercantRoute = require("./controller/historique_commercant")
const historiqueRoute = require("./controller/historique.route");
const paysRoute = require ("./controller/pays");
const categoriesRoute = require('./controller/categorie.route');
const souscategoriesRoute = require('./controller/souscategorie.route');
const commentairesRoute = require('./controller/commentaires');
const promotionsRoute = require('./controller/promotions');
const achatsRoute = require('./controller/Achats');
const sendmailRoute= require('./controller/mail');
const client_commercantRoute = require('./controller/client_commercant');
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
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
app.use('/promotion',promotionsRoute);
app.use('/historique_commercant',historique_commercantRoute);
app.use('/client_commercant',client_commercantRoute);
app.use('/achats',achatsRoute);
app.use('/mail',sendmailRoute);


module.exports = app;
