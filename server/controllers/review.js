const User = require('../model/user');
const Rental = require('../model/rental');
const Review = require('../model/review');
const Booking = require('../model/booking');
const moment = require('moment');
const MongooseHelpers = require('../helpers/mongoose');

exports.getReviews = function(req, res) {
    const { rentalId } = req.query;

    Review.findById({'rental': rentalId})
          .populate('user')
          .exec((err, reviews) => {
            if(err) {
                return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
            }
            
            return res.json(reviews);
          });
}

exports.createReview = function(req, res) {
    const reviewData = req.body;
    const { bookingId } = req.query;
    const user = res.locals.user;

    Booking.findById(bookingId)
           .populate({path: 'rental', populate: {path: 'user'}})
           .populate('review')
           .populate('user')
           .exec(async (err, foundBooking) => {
        if(err) {
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }

        const {rental} = foundBooking.rental;
        if(rental.user.id === user.id) {
            return res.status(422).send({error: [{title: 'Invalid User', detail: 'Cannot create review on your rental'}]});
        }

        const foundBookingUserId = foundBooking.user.id;
        if(foundBookingUserId !== user.id) {
            return res.status(422).send({error: [{title: 'Invalid User', detail: 'Cannot write review on someone else booking'}]});
        }

        const timeNow = moment();
        const endAt = moment(foundBooking.endAt);

        if(!endAt.isBefore(timeNow)) {
            return res.status(422).send({error: [{title: 'Invalid Date', detail: 'You can place the review only after your trip'}]});
        }

        if(foundBooking.review) {
            return res.status(422).send({error: [{title: 'Booking', detail: 'Only one review per booking is allowed'}]});
        }

        const review = new Review(reviewData);
        review.user = user;
        review.rental = rental;
        foundBooking.review = review;

        try {
            await foundBooking.save();
            const saveReview = await review.save();
            return res.json(saveReview);
        } catch(err) {
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }
    });
}

exports.getRentalRating = function(req, res) {
    const rentalId = req.params.id;

    Rental.aggregate([
        {"$unwind": "$rental"},
        {"$group": {
            "_id": rentalId,
            "ratingAvg": {"$avg": "$rating"}
        }}
    ], function(err, result) {
        if(err) {
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }

        return res.json(result[0]['ratingAvg']);
    });
}
