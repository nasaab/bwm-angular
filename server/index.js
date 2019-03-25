
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const config = require('./config/dev'); // This is not required as we are moving to production env
const config = require('./config');
const Rental = require('./model/rental');
const FakeDb = require('./fake-db'); // to avoid every time new loading of fake data

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const imageUploadRoutes = require('./routes/image-upload');
const paymentRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');
const path = require('path');

const settings = {
      reconnectTries : Number.MAX_VALUE,
      autoReconnect : true,
      useNewUrlParser: true
};

mongoose.connect(config.DB_URI, settings).then(() => {
    if(process.env.NODE_ENV !== 'production') {
        const fakeDb = new FakeDb();
        //fakeDb.seedDb(); // to avoid every time new loading of fake data
    }
}).catch((err) => {
    console.log(err);
}) ;

const app = express();

// app.get('/rentals', function(req, res) {
//     res.json({"success": true});
// });

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1', imageUploadRoutes);

if(process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));

    app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('I am running');
});

// const express = require('express');
// const mongoose = require('mongoose');
// const config = require('./config/dev');
// const Rental = require('./model/rental');
// const FakeDb = require('./fake-db');

// const rentalRoutes = require('./routes/rentals');

// mongoose.connect(config.DEV_URI, {useNewUrlParser: true}).then(() => {
//     const fakeDb = new FakeDb();
//     fakeDb.seedDb();
// }).catch((err) => {
//     console.log(err);
// }) ;

// const app = express();

// // app.get('/rentals', function(req, res) {
// //     res.json({"success": true});
// // });

// app.use('/api/v1/rentals', rentalRoutes);

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, function() {
//     console.log('I am running');
// });

