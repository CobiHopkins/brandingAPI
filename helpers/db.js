const mysql = require('promise-mysql');
const { database } = require('../config');

exports.run_query = async (query, values) => {
    try {
        const conn = await mysql.createConnection(database);
        let data = await conn.query(query, values);
        await conn.end();
        return data;
      } catch (error) {
        console.error(error, query);
        throw 'Database query error';
      }
}