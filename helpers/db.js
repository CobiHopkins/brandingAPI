const mysql = require('promise-mysql');
const { databaseInfo } = require('../config');
const { logger } = require('./logger');

const pool = mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT,
            connectionLimit: 10
        });

// needs testing and comparison for performance
exports.run_query = async (query, values) => {
    try {
      
        const conn = await pool.getConnection();
        let [data] = await conn.query(query, values);
        return data;

      } catch (error) {
        logger.error("Database query error", error);
        throw error;
      } finally {
        if (conn) conn.release();
      }
}

// exports.run_query = async (query, values) => {
//     try {
//         const conn = await mysql.createConnection(databaseInfo);
//         let data = await conn.query(query, values);
//         await conn.end();
//         return data;
//       } catch (error) {
//         logger.error("Database query error", error);
//         return error;
//       }
// }