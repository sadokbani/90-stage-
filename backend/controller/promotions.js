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




router.get("", (req, res, next) => {



});


router.put("/validation/:time/:id", (req, res, next) => {
  setTimeout(()=>{
    Promotion.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
  }, req.params.time);


});

module.exports = router;
