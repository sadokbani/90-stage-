
const express = require('express');
const app = express();
const historiqueRoutes = express.Router();


let historique = require('../models/historique');



historiqueRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let Historique = new historique();
  Historique.Utilisateur=req.body.Utilisateur;
  Historique.Coupon=req.body.Coupon;

  Historique.Promotion=req.body.Promotion;
  Historique.Remise=req.body.Remise;
  Historique.save()
    .then(Historique => {
      res.status(200).json({'historique': 'historique has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
historiqueRoutes.route('/').get(function (req, res) {
  historique.find(function (err,historique){
    if(err){
      console.log(err);
    }
    else {
      res.json(historique);
    }
  });
});

// Defined edit route
historiqueRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  historique.findById(id, function (err, historique){
    res.json(historique);
  });
});

//  Defined update route
historiqueRoutes.route('/update/:id').post(function (req, res) {
  console.log(req.body);
  historique.findById(req.params.id, function(err, historique) {
    if (!historique)
      res.status(404).send("Record not found");
    else {

      historique.Utilisateur = req.body.Utilisateur;
      historique.Promotion = req.body.Promotion;
      historique.Coupon = req.body.Coupon;
      historique.Remise = req.body.Remise;
      historique.Date = req.body.Date;
      historique.Etat = req.body.Etat;

      historique.save().then(historique=> {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
historiqueRoutes.route('/delete/:id').get(function (req, res) {
  historique.findByIdAndRemove({_id: req.params.id}, function(err, historique){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = historiqueRoutes;
