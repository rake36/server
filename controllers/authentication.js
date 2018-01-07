const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // sub => short for subject
    // iat => issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
    // User already validated
    // Just need to give a token
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
    // res.send({ success: 'true' });

    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'Missing email or password.' });
    }

    // Check for duplicate user
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        // If dupe found, return error
        if (existingUser) {
            return res.status(422).send({ error: 'email is in use' });
        }

        // create and save new user
        const user = new User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) return next(err);
        });

        // response to request showing user created
        res.json({ token: tokenForUser(user) });
    });
}