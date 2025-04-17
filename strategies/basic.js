const basicStrategy = require('passport-http').BasicStrategy;
const UserModel = require('../models/user');

const bcrypt = require('bcrypt');
const { basicInfo } = require('../config');


const validatePassword = async (user, password) => {
    /**
     * A functiont to validate a password given with the hashed password of the user.
     * 
     * @param user - A user object containing the contents required to validate a password.
     * @param password - A plaintext password provided by the user.
     * 
     * @returns isMatch - Boolean (true if valid, false otherwise).
     * 
     **/

    const isMatch = bcrypt.compare(password, user.password);
    return isMatch;
}

const checkUserDetails = async (username, password, done) => {

    let res;

    try {
        res = await UserModel.getByUsername(username);
    } catch (error) {
        return done(error);
    }

    if (res.length) {
        const valid = await validatePassword(res[0], password);

        if (valid) {
            const user = { ID: res[0].ID, role: res[0].role};
            return done(null, user);
        }

    }

    return done("Incorrect username or password", false);
}

const strategy = new basicStrategy(checkUserDetails);
module.exports = strategy;