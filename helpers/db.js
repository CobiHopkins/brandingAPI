const mysql = require('mysql2/promise');
const { databaseInfo } = require('../config');
const { logger } = require('./logger');

exports.run_query = async (query, values) => {
    try {
        const conn = await mysql.createConnection(databaseInfo);
        
        let data = await conn.execute(query, values);
        await conn.end();
        
        return data;
    } catch (error) {
      
        logger.error("Database query error", error);
        return error;
    }
};