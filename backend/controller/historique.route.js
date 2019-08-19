
const express = require('express');
const app = express();
const historiqueRoutes = express.Router();


let historique = require('../models/historique');


//ajouter dans l'historique
historiqueRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let Historique = new historique();
  Historique.ID_Utilisateur=req.body.Utilisateur;
  Historique.ID_commercant=req.body.commercant;
    Historique.NOM_commercant=req.body.nom_commercant;
    Historique.NOM_Utilisateur=req.body.nom_Utilisateur;
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
// récupérer l'historique
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

//supprimer l'un des historiques
historiqueRoutes.route('/delete/:id').delete(function (req, res) {
  historique.findByIdAndRemove({_id: req.params.id}, function(err, historique){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = historiqueRoutes;
