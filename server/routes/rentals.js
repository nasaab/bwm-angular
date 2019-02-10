const express = require('express');
const router = express.Router();
const Rental = require('../model/rental');
const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware,  function(req, res){
    res.json({"secret": true});
});

router.get('', function(req, res) {
    //res.json({'Ok': true});
    Rental.find({}, function(err, foundRentals) {
        res.json(foundRentals);
    });
});

router.get('/:id', function(req, res) {
    const rentalId = req.params.id;

    Rental.findById(rentalId, function(err, foundRental) {
        if(err) {
            res.status(422).send({errore: {title: 'Rental Error', detail: 'Could not fund Rental'}});
        }
        res.json(foundRental);
    });
});

module.exports = router;