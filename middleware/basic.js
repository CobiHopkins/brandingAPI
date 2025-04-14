const passport = require('passport');
const BasicStrategy = require('../strategies/basic');

passport.use('basic', BasicStrategy);
module.exports = passport.authenticate('basic', {session: false});