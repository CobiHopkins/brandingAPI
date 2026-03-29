const { run_query } = require('../helpers/db');

exports.findAll = async (page, limit, order) => {
    let offset = limit * (page-1);

    const query = "SELECT * FROM tags ORDER BY ? LIMIT ? OFFSET ?;";
    const values = [order, parseInt(limit), offset];

    const data = await run_query(query, values);
    return data;
}

exports.getById = async (id) => {
    const query = "SELECT * FROM tags WHERE id = ?;";
    const values = [id];
    
    const data = await run_query(query, values);
    return data;
}

exports.getByName = async (name) => {
    const placeholders = typeof name === 'string' ? '?' : name.map(() => '?').join(', ');

    const query = `SELECT * FROM tags WHERE name in (${ placeholders });`;
    const values = name.length <= 1 ? [name] : name;

    const data = await run_query(query, values);
    return data;
}