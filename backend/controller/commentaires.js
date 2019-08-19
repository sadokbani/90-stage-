const express = require("express");
const Commentaire = require("../models/commentaire");

const router = express.Router();


//récupérer  les commentaires actives
router.get("/active", (req, res, next) => {
  Commentaire.find({valide: 1}).then(documents => {
    res.status(200).json({
      message: "commentaire fetched successfully!",
      commentaires: documents //we can also use map methode
    });
  });
});
//récupérer les commentaires déactivés
router.get("/desac", (req, res, next) => {
  Commentaire.find({valide: 0}).then(documents => {
    res.status(200).json({
      message: "commentaire fetched successfully!",
      commentaires: documents //we can also use map methode
    });
  });
});



//ajouter un commentaire
router.post("", (req, res, next)=>{
  commentaire = new Commentaire(req.body);
  console.log(commentaire);
  commentaire.save().then(com => {
    res.status(201).json({
      message: "commentaire added successfully",
    });
  });
});
//déactiver un commentaire
router.put("/desactiver/:id", (req, res, next) => {
  // console.log(req.body);
  Commentaire.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});
// reactiver un commentaire
router.put("/activer/:id", (req, res, next) => {
  // console.log(req.body);
  Commentaire.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});

//supprimer un commentaire
router.delete('/:id', (req, res) => {

  Commentaire.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in commentaire Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;
