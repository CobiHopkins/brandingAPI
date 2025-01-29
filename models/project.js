const db = require('../helpers/db');

exports.getAll = async () => {
    let query = "SELECT * FROM projects";
    let data = await db.run_query(query);
    return data;
}

exports.getById = async (id) => {
    let query = "SELECT * FROM projects WHERE id = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

exports.createProject = async (project) => {
    let query = "INSERT INTO projects SET ?";
    let data = await db.run_query(query, project);
    return data;
}

exports.updateProject = async (project) => {
    let query = "UPDATE projects SET ? WHERE id = ?";
    let values = [project, project.id];
    let data = await db.run_query(query, values);
    return data;
}

exports.deleteProject = async (id) => {
    let query = "DELETE * FROM projects WHERE id = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}