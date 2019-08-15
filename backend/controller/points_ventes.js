const express = require('express');
const app = express();
const ptvRoutes = express.Router();

let PVT = require('../models/pvt');


ptvRoutes.route('/add').post(function (req, res) {
    console.log(req.body);
    let pvt = new PVT(req.body);
    pvt.save()
        .then(pvt => {
            res.status(200).json({'PVT': 'PVT has been added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

ptvRoutes.route('/:id').get(function (req, res) {
    PVT.find({valide: 1 , ID_commercant : req.params.id},function (err,pvt){
        if(err){
            console.log(err);
        }
        else {
            res.json(pvt);
            console.log(err);
        }
    });
});

ptvRoutes.route('/archive/:id').get(function (req, res) {
    PVT.find({valide: 0}, {ID_commercant : req.params.id},function (err,pvt){
        if(err){
            console.log(err);
        }
        else {
            res.json(pvt);
        }
    });
});


ptvRoutes.put("/restaurer_ptv/:id", (req, res, next) => {

    PVT.findByIdAndUpdate(req.params.id, {$set: {valide: 1}}, function (err, pvt) {
        if(err){
            console.log(err);
        }
        else {
            res.json(pvt);
        }
    });
});



ptvRoutes.put("/archiver_ptv/:id", (req, res, next) => {

    PVT.findByIdAndUpdate(req.params.id, {$set: {valide: 0}}, function (err, pvt) {
        if(err){
            console.log(err);
        }
        else {
            res.json(pvt);
        }
    });
});


ptvRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    PVT.findById(id, function (err, pvt){
        res.json(pvt);
    });
});

ptvRoutes.route('/update/:id').put(function (req, res) {
    console.log(req.body);
    PVT.findById(req.params.id, function(err, pvt) {
        if (!pvt)
            res.status(404).send("Record not found");
        else {

            pvt.Nom = req.body.Nom;
            pvt.Priority = req.body.Priority;

            pvt.save().then(pays=> {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

ptvRoutes.route('/delete/:id').delete(function (req, res) {
    PVT.findByIdAndRemove({_id: req.params.id}, function(err, pvt){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});




module.exports = ptvRoutes;
