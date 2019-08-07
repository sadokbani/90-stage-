
const express = require('express');
const app = express();
const paysRoutes = express.Router();
var TJO = require('translate-json-object')();
// use API of countries
const Countries = require('countries-api');
let Pays = require('../models/pays');


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






paysRoutes.get("/aaaa/:lat/:long", (req, res, next) =>{
  console.log(req.params.lat.toString());
  console.log(req.params.long);

  res.json(Countries.findByLatLong([parseFloat(req.params.lat), parseFloat(req.params.long)]).data);
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

paysRoutes.route('/delete/:id').delete(function (req, res) {
  Pays.findByIdAndRemove({_id: req.params.id}, function(err, pays){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});


paysRoutes.get("/list", (req, res, next) =>{
  TJO.init({
    yandexApiKey: 'trnsl.1.1.20190807T153824Z.bd5725d6afafb6d3.8596bd15ce68477004c92ee2a2f6cd38836b5cea'
  });

  var countrie=Countries.findAll().data;
  var table=new Array();

  for (var i = 0; i < countrie.length; i++) {
    table.push(Countries.findAll().data[i].name.common);
  }

  var example ={pays:table};


  TJO.translate(example, 'fr')
    .then(function(data) {
      res.json(data);

    }).catch(function(err) {
    console.log('error ', err)
  });
});



module.exports = paysRoutes;
