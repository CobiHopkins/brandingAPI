const bcrypt = require('bcrypt');
const { basicInfo } = require('../config');

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(basicInfo.saltRounds);
        const hash = await bcrypt.hash(password, salt);

        return {hash, salt};
    } catch (error) {
        //TODO: Catch error and log via winston. 
        throw error;
    }
}