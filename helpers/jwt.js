const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { jwtInfo } = require('../config');

exports.generateToken = (user) => {
    const payload = {
        sub: user.ID,
        role: user.role_id
    }

    return jwt.sign(payload, process.env.jwt_secret_key, {
        algorithm: jwtInfo.algorithm,
        expiresIn: jwtInfo.expiration
    });
}

exports.generateRefreshToken = (user) => {

    const payload = {
        sub: user.ID,
        jti: uuidv4()
    }

    return jwt.sign(payload, process.env.refresh_secret_key, {
        algorithm: jwtInfo.algorithm,
        expiresIn: jwtInfo.refresh_expiration
    });
}