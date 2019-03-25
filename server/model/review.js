const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ALLOWED_RATINGS = [1, 2, 3, 4, 5];

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rental: {type: Schema.Types.ObjectId, ref: 'Rental'}
});

module.exports = mongoose.model('Review', reviewSchema);

reviewSchema.pre('save', function(next) {
    if(ALLOWED_RATINGS.indexOf(this.rating) >= 0) {
        next();
    } else {
        const err = new Error({rating: 'Not Valid Rating'});
        err.errors = {};
        err.errors.rating = {message: 'This rating is not allowed'};
        next(err);
    }
})