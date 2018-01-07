const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
    // define all our routes here
    // app.get('/', function (req, res, next) {
    //     res.send(['string1', 'string2', 'string3']);
    // });

    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signup', Authentication.signup);
}