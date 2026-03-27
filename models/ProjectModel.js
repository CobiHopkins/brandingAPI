const { run_query } = require('../helpers/db');

exports.findAll = async (page, limit, order) => {
    let offset = limit * (page-1);

    const query = "SELECT * FROM projects";
    const values = [order, parseInt(limit), offset]
    const data = await run_query(query, values);
    
    return data;
}

exports.getById = async (id) => {
    const query = "SELECT * FROM projects WHERE id = ?";
    const values = [id];
    const data = await run_query(query, values);
    return data;
}

exports.findProjectTags = async (id) => {
    const query = "SELECT * FROM project_tags INNER JOIN tags ON project_tags.tag_id = tags.id WHERE project_tags.project_id = ?;";
    const values = [id];

    const data = await run_query(query, values);
    return data;
}