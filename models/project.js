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
    const values = [project, project.ID];
    const data = await run_query(query, values);

    return data;
}

exports.deleteProject = async (id) => {
    const query = "DELETE FROM projects WHERE ID = ?";
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

exports.addProjectTags = async (tags) => {
    const placeholders = tags.map(() => '(?, ?)').join(', ');
    const query = `INSERT IGNORE INTO project_tags (project_id, tag_id) VALUES ${placeholders};`;

    const data = await run_query(query, tags.flat());
    return data;
}