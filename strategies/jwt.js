const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user');

const { jwtInfo } = require('../config');

let options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtInfo.secret_key,
    algorithm: [jwtInfo.algorithm]
}

const verifyJwt = async (payload, done) => {
    const user = await UserModel.getById(payload.sub);

    if (Array.isArray(user) && user.length == 0) {
        return done(null, false)
    }
    
    return done(null, false);
}

const strategy = new jwtStrategy(options, verifyJwt);

module.exports = strategy;