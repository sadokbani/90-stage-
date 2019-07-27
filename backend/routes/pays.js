// product.route.js

const express = require('express');
const app = express();
const paysRoutes = express.Router();

// Require Product model in our routes module
let Pays = require('../models/pays');

// Defined store route

paysRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let pays = new Pays(req.body);
  pays.save()
    .then(pays => {
      res.status(200).json({'Pays': 'Pays has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

paysRoutes.route('/').get(function (req, res) {
  Pays.find({valide: 1},function (err,pays){
    if(err){
      console.log(err);
    }
    else {
      res.json(pays);
    }
  });
});

paysRoutes.route('/archive').get(function (req, res) {
  Pays.find({valide: 0},function (err,pays){
    if(err){
      console.log(err);
    }
    else {
      res.json(pays);
    }
  });
});


paysRoutes.put("/restaurer_pays/:id", (req, res, next) => {

  Pays.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, pays) {
    if(err){
      console.log(err);
    }
    else {
      res.json(pays);
    }
  });
});



paysRoutes.put("/archiver_pays/:id", (req, res, next) => {

  Pays.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, pays) {
    if(err){
      console.log(err);
    }
    else {
      res.json(pays);
    }
  });
});


paysRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Pays.findById(id, function (err, pays){
    res.json(pays);
  });
});

//  Defined update route
paysRoutes.route('/update/:id').put(function (req, res) {
  console.log(req.body);
  Pays.findById(req.params.id, function(err, pays) {
    if (!pays)
      res.status(404).send("Record not found");
    else {

      pays.Nom = req.body.Nom;
      pays.Priority = req.body.Priority;

      pays.save().then(pays=> {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
paysRoutes.route('/delete/:id').delete(function (req, res) {
  Pays.findByIdAndRemove({_id: req.params.id}, function(err, pays){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = paysRoutes;
