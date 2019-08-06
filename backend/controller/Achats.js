
const express = require('express');
const app = express();
const achatsRoutes = express.Router();


let Achats = require('../models/achats');



achatsRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let achats = new Achats((req.body));
  achats.save()
    .then(achats => {
      res.status(200).json({'achats': 'achats has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = achatsRoutes;
