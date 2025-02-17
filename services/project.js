const ProjectModel = require('../models/project');

exports.findAll = async (page, limit, order) => {
    const data = await ProjectModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const project = await ProjectModel.getById(id);

    return project;
}

exports.createProject = async (project) => {
    const newProject = await ProjectModel.createProject(project);

    return newProject;
}

exports.updateProject = async (project) => {
    const updatedProject = await ProjectModel.updateProject(project);

    return updatedProject;
}

exports.deleteProject = async (id) => {
    const deletedProject = await ProjectModel.deleteProject(id);

    return deletedProject;
}

exports.findProjectTags = async (id) => {
    const data = await ProjectModel.findProjectTags(id);

    return data;
}

exports.addProjectTags = async (id, tags) => {
    const tagData = tags.map(tag => [Number(id), tag.ID]);
    const data = await ProjectModel.addProjectTags(tagData);

    return data;
}