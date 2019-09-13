const Booking = require('../model/booking');
const Rental = require('../model/rental');
const User = require('../model/user');
const Payment = require('../model/payment');
const MongooseHelpers = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SK);
const CUSTOMER_SHARE = 0.8; // We are giving money to customer 80% of total amount on booking made. And as 
// a service provider we are keeping 20% of share.

exports.createBooking = function(req, res) {
    const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;

    const user = res.locals.user;
    console.log("create booking function");
    console.log(user);
    const booking = new Booking({startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundRental) {
        if(err) {
            console.log("Mongoose error on line 26");
            console.log(err);
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }

        if(foundRental.user.id === user.id) {
            console.log("Invalid User on line 31");
            return res.status(422).send({error: [{title: 'Invalid user', detail: 'Cannot create booking on your Rental'}]});
        }

        //Check here for valid booking
        if(isValidBooking(booking, foundRental)) {
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking);
            //Create payment
            const { payment, err } = await createPayment(booking, foundRental.user, paymentToken);
            
            if(payment) {                
                booking.payment = payment;                
                
                booking.save(function(err) {
                    if(err) {
                        console.log("Mongoose error online 48");
                        console.log(err);
                        return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)}); 
                    }
                    console.log("foundRental.save on line 51");
                    foundRental.save();
                    User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

                    return res.json({startAt: booking.startAt, endAt: booking.endAt});
                });
            } else {
                console.log("in else part of payment on line 58");
                return res.status(422).send({error: [{title: 'Payment Error', detail: err}]});
            }
        } else {
            console.log("in else part of isValidBooking on line 62");
            return res.status(422).send({error: [{title: 'Invalid Booking', detail: 'Choosen dated are already taken!'}]});
        }
    });
}

exports.getUserBookings = function(req, res) {
    console.log("getUserBookings function");
    const user = res.locals.user;

    Booking.where({user: user})
            .populate('rental')
            .exec(function(err, foundBookings) {
                if(err) {
                    console.log(err);
                    return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)}); 
                }
                console.log(foundBookings);
                res.json(foundBookings);
            })
}

function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if(rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every(function(booking) {
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

            if((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart))
                return true;
            else
                return false;
        });
    }

    return isValid;
}

async function createPayment(booking, toUser, token) {
    const { user } = booking;

    const customer = await stripe.customers.create({
        source: token.id,
        email: user.email
    });

    if(customer) {
        console.log("inside create payment if part on line 114");
        User.update({_id: user.id}, {$set: {stripeCustomerId: customer.id}}, () => {});
        const payment = new Payment({
            fromUser: user,
            toUser: toUser,
            fromStripeCustomerId: customer.id,
            booking: booking,
            tokenId: token.id,
            amount: booking.totalPrice * 100 * CUSTOMER_SHARE
        });

        try {           
            const savedPaymennt = await payment.save();
            console.log("in try block of create payment");
            return {payment: savedPaymennt};
        } catch(err) {
            console.log("in catch block of create payment");
            return {err: err.message};
        }

    } else {
        console.log("inside create payment else part on line 114");
        return {err: 'Cannot process payment!'};
    }
}