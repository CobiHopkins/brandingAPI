const jwt = require('jsonwebtoken');
const { jwtInfo } = require('../config');

exports.generateToken = (user) => {
    const payload = {
        sub: user.ID,
        role: user.role_id
    }

    return jwt.sign(payload, jwtInfo.secret_key, {
        algorithm: jwtInfo.algorithm,
        expiresIn: jwtInfo.expiration
    });
}