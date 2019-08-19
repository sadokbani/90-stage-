
const express = require('express');
const app = express();
const souscategoriesRoutes = express.Router();

let SousCategorie = require('../models/SousCategorie');

//ajouter une sous catégorie
souscategoriesRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let souscategorie = new SousCategorie(req.body);
  souscategorie.save()
    .then(souscategorie => {
      res.status(200).json({'SousCategorie': 'SousCategorie has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
// récupérer tous les sous catégories
souscategoriesRoutes.route('/').get(function (req, res) {
  SousCategorie.find({valide: 1},function (err,souscategories){
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategories);
    }
  });
});
//récupérer les sous catégories archivée
souscategoriesRoutes.route('/archive').get(function (req, res) {
  SousCategorie.find({valide: 0},function (err,souscategorie){
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategorie);
    }
  });
});
//récupérer les sous catégories archivés recherché par nom de catégorie
souscategoriesRoutes.route('/archive/:selected').get(function (req, res) {
  SousCategorie.find({valide: 0 , CategorieNom: req.params.selected },function (err,souscategorie){
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategorie);
    }
  });
});

//récupérer les sous catégories par nom de catégorie
souscategoriesRoutes.route('/selected_SousCategorie/:selected').get(function (req, res) {

  SousCategorie.find({valide: 1 , CategorieNom: req.params.selected},function (err,souscategorie){
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategorie);
    }
  });
});
//restaurer une sous catégorie
souscategoriesRoutes.put("/restaurer_souscategorie/:id", (req, res, next) => {

  SousCategorie.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, souscategorie) {
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategorie);
    }
  });
});


// archiver une sous catégorie
souscategoriesRoutes.put("/archiver_souscategorie/:id", (req, res, next) => {

  SousCategorie.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, souscategorie) {
    if(err){
      console.log(err);
    }
    else {
      res.json(souscategorie);
    }
  });
});
//récupérer les informations des sous catégorier à modifier
souscategoriesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  SousCategorie.findById(id, function (err, souscategorie){
    res.json(souscategorie);
  });
});
//modifier la sous catégorie
souscategoriesRoutes.route('/update/:id').put(function (req, res) {
  console.log(req.body);
  SousCategorie.findById(req.params.id, function(err, souscategorie) {
    if (!souscategorie)
      res.status(404).send("Record not found");
    else {

      souscategorie.SousCategorieNom = req.body.SousCategorieNom;
      souscategorie.CategorieNom = req.body.CategorieNom;
      souscategorie.Priority = req.body.Priority;

      souscategorie.save().then(souscategorie=> {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});
//supprimer une sous catégorie
souscategoriesRoutes.route('/delete/:id').delete(function (req, res) {
  SousCategorie.findByIdAndRemove({_id: req.params.id}, function(err, souscategorie){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = souscategoriesRoutes;
