const { logger } = require('../helpers/logger');
const { generateToken, generateRefreshToken } = require('../helpers/jwt');

const { jwtInfo } = require('../config');

const prefix = '/api/v1/auth';

exports.login = async (req, res) => {
    try {
        const user = req.user;

        const jwt = generateToken(user);
        const refresh = generateRefreshToken(user);

        if (jwt && refresh) {
            return res.status(200).json({
                token: jwt,
                refreshToken: refresh,
                jwtExpiresIn: jwtInfo.expiration,
                refreshExpiresIn: jwtInfo.refresh_expiration
            });
        }

        return 
    } catch (error) {
        console.error(error);
        return res.body({
            message: error.message
        });
    }
}