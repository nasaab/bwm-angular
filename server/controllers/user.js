const User = require('../model/user');
const MongooseHelpers = require('../helpers/mongoose');
// destructuring ---- Replace MongooseHelpers.normalizeErrors with normalizeErrors
// const { normalizeErrors } = require('../helpers/mongoose');

const jwt = require('jsonwebtoken');
// const config = require('../config/dev'); // This is not required as we are moving to production env
const config = require('../config');

exports.auth = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: {title: 'Data missing', detail: 'Provide email and password'}});
    }

    User.findOne({email}, function(err, user) {
        if(err) {
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }

        if(!user) {
            return res.status(422).send({error: {title: 'Invalid user', detail: 'User does not exist'}});
        }

        if(user.isSamePassword(password)) {
            //return jwt token
            const token = jwt.sign({
                    userId: user.id,
                    username: user.username
                }, config.SECRET, { expiresIn: '1h' });
            return res.json(token);
        } else {
            return res.status(422).send({error: {title: 'Wrong user', detail: 'Wrong user email and password'}});
        }
    })
}

exports.register = function(req, res) {
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirmation = req.body.passwordConfirmation;

    const { username, email, password, passwordConfirmation } = req.body;

    if(!email || !password) {
        return res.status(422).send({error: {title: 'Data missing', detail: 'Provide email and password'}});
    }

    if(password !== passwordConfirmation) {
        return res.status(422).send({error: {title: 'Invalid password', detail: 'Password is not same as confirm password'}});
    }

    User.findOne({email: email}, function(err, existingUser) {
        if(err) {
            // return res.status(422).send({'mongoose': 'handle mongoose error in next lecture'});
            return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
        }
        if(existingUser) {
            return res.status(422).send({error: {title: 'Invalid email', detail: 'User with this email already exist'}});
        }

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save(function(err) {
            if(err) {
                // return res.status(422).send({'mongoose': 'handle mongoose error in next lecture'});
                return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)});
            }
            return res.json({'registered': true});
        });
    });
}

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err, user) {
            if(err) {
                return res.status(422).send({error: MongooseHelpers.normalizeErrors(err.errors)}); 
            }

            if(user) {
                res.locals.user = user;
                next();
            } else {
                return res.status(401).send({error: {title: 'Not authorized', detail: 'You need to login to get access'}});
            }
        });
    } else {
        return res.status(401).send({error: {title: 'Not authorized', detail: 'You need to login to get access'}});
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}