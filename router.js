module.exports = function (app) {
    // define all our routes here
    app.get('/', function (req, res, next) {
        res.send(['string1', 'string2', 'string3']);
    });
}