const express = require('express');
const router = express.Router();
const Rental = require('../model/rental');
const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware,  function(req, res){
    res.json({"secret": true});
});

router.get('', function(req, res) {
    //res.json({'Ok': true});
    Rental.find({})
           .select('-bookings')
           .exec(function(err, foundRentals) {
        res.json(foundRentals);
    });
});

router.get('/:id', function(req, res) {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
          .populate('user', 'username -_id')
          .populate('bookings', 'startAt endAt -_id')
          .exec(function(err, foundRental) {
        if(err) {
            return res.status(422).send({errore: {title: 'Rental Error', detail: 'Could not fund Rental'}});
        }
        return res.json(foundRental);
    });  
});

module.exports = router;