const express = require("express");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const User = require("../models/user");


const router = express.Router();
//types des fichiers autorisés pour upload
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
//ajouter un client ou un commercant
router.post(
  "/:role",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    if (req.params.role == 1){
      const user  = new User({
        nom: req.body.nom,
        role: req.params.role,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        imagePath: url + "/images/" + req.file.filename
      });
      user.save().then(createdUser => {
        res.status(201).json({
          message: "commercant added successfully",
          user: {
            ...createdUser,
            id: createdUser._id
          }
        });
      });
    }
    else {
      const user  = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.params.role,
        nombreJeton: 10,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        imagePath: url + "/images/" + req.file.filename
      });
      user.save().then(createdUser => {
        res.status(201).json({
          message: "client added successfully",
          user: {
            ...createdUser,
            id: createdUser._id
          }
        });
      });
    }


  }
);



// récupérer la listes des clients et des commercants
router.get("", (req, res, next) => {

  setTimeout(()=>{
    User.find().then(documents => {
      res.status(200).json({
        message: "users fetched successfully!",
        users: documents //we can also use map methode
      });
    });
  }, 10000);

});
//vérification de l'existence de l'email lors de connexion
router.get("/exist/:email", (req, res, next) => {


        User.find({"email" : req.params.email}).count().then(documents => {
            res.status(200).json({
                message: "email fetched successfully!",
                users: documents //we can also use map methode
            });
            console.log(res.users);
        });


});
// confirmer le compte de l'utilisateur
router.put("/confirm/:email", (req, res, next) => {
    User.updateOne({email: req.params.email}, {$set: {confirmed: 1}}, function (err, doc) {
        if (err) return next(err);
        res.send(doc);
    });
});
//re
router.put("/restaurer/:id", (req, res, next) => {
    User.finddAndUpdate({_id: req.params.id}, {$set: {valide: 1}}, function (err, doc) {
        if (err) return next(err);
        res.send(doc);
    });

});

router.put("/PVENTE/:id/:adresse", (req, res, next) => {
    User.finddAndUpdate({_id: req.params.id}, {$set: {PTVENTE: req.params.adresse} }, function (err, doc) {
        if (err) return next(err);
        res.send(doc);
        console.log('aaa');
    });

});
//recupérer un utilisateur par ID
router.get("/:id", (req, res, next) =>{
  User.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2)); }
  });
});

// récupérer tous les clients non archivés
router.get("/valide/tous", (req, res, next) =>{
  User.find({valide: 1}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});




router.get("/commercant/:email/:pwd", (req, res, next) =>{
  User.findOne({ email: req.params.email , confirmed: 1},function (err, doc) {

    console.log(doc)
    if (doc){
        User.findOne({ email: req.params.email , confirmed: 1},function (err, doc) {
            if (doc){
      if(doc.isValid(req.params.pwd)) res.status(200).json(doc);
      else res.status(500).json("not confirmed");}
    });
    }
    else res.status(500).json("not found");
  });

});



router.get("/commercant/:email", (req, res, next) => {
    User.findOne({ email: req.params.email },function (err, doc) {

      if (doc){
        res.status(200).json(doc);
      }
      else res.status(500).json("not found");
    });


});

router.post("/social/add",(req,res,next)=>{
  let user= new User(req.body);
  user.save()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});
// récuperer les clients et les commercants archivés
router.get("/archive/tous", (req, res, next) =>{
  User.find({valide: 0}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});

//récupérer les clients non archivés
router.get("/valide/client", (req, res, next) =>{
  User.find({valide: 1, role:2}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});
//récupérer les clients archivés
router.get("/archive/client", (req, res, next) =>{
  User.find({valide: 0, role:2}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});

//récupérer les commercants non archivés
router.get("/valide/commercant", (req, res, next) =>{
  User.find({valide: 1, role:1}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});
//récupérer les commercants archivés
router.get("/archive/commercant", (req, res, next) =>{
  User.find({valide: 0, role:1}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});
// modification d'un client avec modification d'image
router.put("/image/:id",multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  User.findByIdAndUpdate(req.params.id, {$set: {
      ...req.body,
      password: User.hashPassword(req.body.password),
      imagePath: url + "/images/" + req.file.filename
    }}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});

//modification des information d'un client sans modifier son image
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});
//modification de mot de passe
router.put("/reset/:email", (req, res, next) => {
  console.log(req.params.email, req.params.password);
  User.updateOne({email: req.params.email}, {$set:{password:  User.hashPassword(req.body.password)}} , function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});
//archiver un client
router.put("/archive/:id", (req, res, next) => {
  // console.log(req.body);
  User.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});
//restaurer un client
router.put("/restaurer/:id", (req, res, next) => {
  // console.log(req.body);
  User.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});
//supprimer un client
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});



module.exports = router;
