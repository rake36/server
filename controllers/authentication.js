const User = require('../models/user');

exports.signup = function (req, res, next) {
    // res.send({ success: 'true' });

    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

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
        res.json({ success: true, id: user.id });
    });
}