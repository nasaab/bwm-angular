const Rental = require('./model/rental');
const User = require('./model/user');
const Booking = require('./model/booking');

const fakeDbDate = require('./data.json');

class FakeDb {
    constructor() {
        this.rentals = fakeDbDate.rentals;

        this.users = fakeDbDate.users;
    }

    async cleanDb() {
        await User.remove();
        await Rental.remove();
        await Booking.remove();
    }

    // pushRentalToDb() {
    //     this.rentals.forEach((rental) => {
    //         const newRental = new Rental(rental);

    //         newRental.save();
    //     })
    // }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user1 = new User(this.users[1]);
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;
            user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user1.save();
    }

    async seedDb() {
        await this.cleanDb();
        //this.pushRentalToDb();
        this.pushDataToDb();        
    }
}

module.exports = FakeDb;