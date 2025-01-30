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

exports.createProject = async (project) => {
    const query = "INSERT INTO projects SET ?";
    const data = await run_query(query, project);
    return data;
}

exports.updateProject = async (project) => {
    const query = "UPDATE projects SET ? WHERE id = ?";
    const values = [project, project.id];
    const data = await run_query(query, values);
    return data;
}

exports.deleteProject = async (id) => {
    const query = "DELETE * FROM projects WHERE id = ?";
    const values = [id];
    const data = await run_query(query, values);
    return data;
}