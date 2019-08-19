const express = require("express");
const Promotion = require("../models/promotion");
const multer = require("multer");

const router = express.Router();
//types des fichier autorisés pour upload

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
//upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
// ajouter une promotion
router.post(
  "",
  multer({ storage: storage }).array("image",12),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const imageArray= new Array();
    for (var i = 0; i < req.files.length; i++) {
      imageArray.push( url + "/images/" + req.files[i].filename)
    }
    console.log(imageArray);
    const promotion  = new Promotion({
      ...req.body,
      imagePath: imageArray
    });
    promotion.save().then(createdPromo => {
      res.status(201).json({
        message: "promotion added successfully",
        promotion: {
          createdPromo
        }
      });
    });
  }
);
//récupérer toutes les promotions
router.get("", (req, res, next) => {
  Promotion.find().then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});


//récupérer les promotion d'un commercant , recherche par ID
router.get("/:id", (req, res, next) =>{
  Promotion.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Promotion :' + JSON.stringify(err, undefined, 2)); }
  });
});


router.get("", (req, res, next) => {



});

//activer une promotion
router.put("/activation/:time/:id", (req, res, next) => {
  setTimeout(()=>{
    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
  }, req.params.time);


});
// déactiver une promotion
router.put("/desactivation/time/:id", (req, res, next) => {
  setTimeout(()=>{
    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
  }, 5400000);


});


router.put("/activation/:id", (req, res, next) => {

    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
});

router.put("/desactivation/:id", (req, res, next) => {

    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
});
//supprimer une promotion
router.delete('/:id', (req, res) => {

  Promotion.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Promotion Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

//modification d'une promotion avec modification des images
router.put("/image/:id",multer({ storage: storage }).array("image",12), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const imageArray= new Array();
  for (var i = 0; i < req.files.length; i++) {
    imageArray.push( url + "/images/" + req.files[i].filename)
  }
  Promotion.findByIdAndUpdate(req.params.id, {$set: {
      ...req.body,
      imagePath:imageArray
    }}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});

//modification d'une promotion sans modification d'image
router.put("/:id", (req, res, next) => {
  Promotion.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});

//récupération des promotions d'un commercant , recherche par nom
router.get("/commercant/:nom", (req, res, next) => {
  Promotion.find({commercant:req.params.nom}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents
    });
  });
});
// récupérer les promotions par catégories
router.get("/categorie/:nom", (req, res, next) => {
  Promotion.find({categorieNom:req.params.nom}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});
//récupérer les promotions par catégorie et nom de commercant
router.get("/mult/:nomcategorie/:nomcommercant", (req, res, next) => {
  Promotion.find({categorieNom:req.params.nomcategorie,commercant:req.params.nomcommercant}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});
//récuperer les promotions par nom de commercant , nom de catégorie et de sous catégorie
router.get("/mult/:nomcategorie/:nomcommercant/:nomsouscateg", (req, res, next) => {
  Promotion.find({categorieNom:req.params.nomcategorie,commercant:req.params.nomcommercant,SousCategorieNom:req.params.nomsouscateg}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});
//récupération des promotions par nom de catégorie et sous catégorie
router.get("/multi/:nomcategorie/:nomsouscateg", (req, res, next) => {
  Promotion.find({categorieNom:req.params.nomcategorie,SousCategorieNom:req.params.nomsouscateg}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});

module.exports = router;
