const express = require("express");
const Promotion = require("../models/promotion");
const multer = require("multer");

const router = express.Router();


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

router.get("", (req, res, next) => {
  Promotion.find().then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});



router.get("/:id", (req, res, next) =>{
  Promotion.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});


router.get("", (req, res, next) => {



});


router.put("/activation/:time/:id", (req, res, next) => {
  setTimeout(()=>{
    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
  }, req.params.time);


});
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

router.delete('/:id', (req, res) => {

  Promotion.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Promotion Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});


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


router.put("/:id", (req, res, next) => {
  Promotion.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, doc) {
    if (err) return next(err);
    res.status(200).json({message:"updated"});
  });

});


router.get("/commercant/:nom", (req, res, next) => {
  Promotion.find({commercant:req.params.nom}).then(documents => {
    res.status(200).json({
      message: "promotion fetched successfully!",
      promotions: documents //we can also use map methode
    });
  });
});

module.exports = router;
