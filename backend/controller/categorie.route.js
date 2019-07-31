
const multer=require("multer");
const express = require('express');
const app = express();
const categoriesRoutes = express.Router();


let Categorie = require('../models/Categorie');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

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

categoriesRoutes.post(
  '/add',
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Categorie({
      CategorieDescription:req.body.CategorieDescription,
      CategorieNom:req.body.CategorieNom,
      CategoriePriority:req.body.CategoriePriority,
      CategorieImage: url + "/images/" + req.file.filename
    });
    post.save().then(createdcategorie => {
      res.status(201).json({
        message: "categorie added successfully",

      });
    });
  }
);

categoriesRoutes.route('/').get(function (req, res) {
  Categorie.find({valide: 1},function (err,categories){
    if(err){
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});
categoriesRoutes.route('/archive').get(function (req, res) {
  Categorie.find({valide: 0},function (err,categories){
    if(err){
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});


categoriesRoutes.put("/restaurer_categorie/:id", (req, res, next) => {

  Categorie.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, categories) {
    if(err){
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});



categoriesRoutes.put("/archiver_categorie/:id", (req, res, next) => {

  Categorie.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, categories) {
    if(err){
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});



categoriesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Categorie.findById(id, function (err, categorie){
      res.json(categorie);
  });
});



categoriesRoutes.put("/image/:id",multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  Categorie.findByIdAndUpdate(req.params.id, {$set: {
      ...req.body,
      CategorieImage: url + "/images/" + req.file.filename
    }}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});


categoriesRoutes.put("/:id", (req, res, next) => {
  Categorie.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});
// Defined delete | remove | destroy route
categoriesRoutes.route('/delete/:id').delete(function (req, res) {
  Categorie.findByIdAndRemove({_id: req.params.id}, function(err, categorie){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = categoriesRoutes;