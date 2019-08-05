const express = require("express");
const app = express();
const User = require("../models/user");

const router = express.Router();

router.get("/valide/client", (req, res, next) =>{
  User.find({valide: 1, role:2}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});

router.get("/archive/client", (req, res, next) =>{
  User.find({valide: 0, role:2}).then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents //we can also use map methode
    });
  });
});


router.put("/archive/:id", (req, res, next) => {
  // console.log(req.body);
  User.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});

router.put("/restaurer/:id", (req, res, next) => {
  // console.log(req.body);
  User.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  });

});



router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});


module.exports = router;
