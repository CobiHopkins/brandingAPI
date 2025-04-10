const passport = require('passport');
const JwtStrategy = require('../strategies/jwt');

passport.use('jwt', JwtStrategy);
module.exports = passport.authenticate('jwt', {session: false})