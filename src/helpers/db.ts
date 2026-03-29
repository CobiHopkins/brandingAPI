const mysql = require('promise-mysql');
const { logger } = require('./logger');


const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            connectionLimit: 10
        });

/**
 * Executes a SQL query against the database using a connection pool.
 * 
 * @param {*} query   SQL Query to be executed.
 * @param {*} values  Values to be escaped in the query.
 * @returns {}  Result of the query.
 * 
 * @example
 *  const result = await run_query('SELECT * FROM projects WHERE id = ?', [projectId]);
 * 
 */
export const run_query = async ({query, values}: {query: string, values: any[]}) => {
    let conn;
    try {
        conn = (await pool).getConnection();
        const data = (await conn).query(query, values);
        return data;

      } catch (error) {
        logger.error("Database query error", error);
        throw error;
      } finally {
        if (conn) (await conn).release();
      }
}