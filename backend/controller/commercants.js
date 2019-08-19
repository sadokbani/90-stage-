const express = require("express");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const Commercant = require("../models/commercant");

const router = express.Router();
//types des fichiers autorisés pour upload
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
//// upload image
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
//ajouter un commercant
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Commercant({
      nom: req.body.nom,
      email: req.body.email,
      password: Commercant.hashPassword(req.body.password),
      imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdCommercant => {
      res.status(201).json({
        message: "Post added successfully",
        commercant: {
          ...createdCommercant,
          id: createdCommercant._id
        }
      });
    });
  }
);
// validation de connexion pour commercant ( verification des informations)
router.post('/login', function(req,res,next){
  let promise = Commercant.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
    if(doc) {
      console.log(doc);
      if(doc.isValid(req.body.password)){
        // generate token
        let token = jwt.sign(doc.toObject(),'secret', {expiresIn : '3h'});

        return res.status(200).json(token);

      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'User email is not registered.'})
    }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
});


router.get('/nom', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}


module.exports = router;
