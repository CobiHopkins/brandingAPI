const projectModel = require('../models/project');

exports.findAll = async (page, limit, order) => {
    const data = await projectModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const project = await projectModel.getById(id);

    return project;
}

exports.createProject = async (project) => {
    const newProject = await projectModel.createProject(project);

    return newProject;
}

exports.updateProject = async (project) => {
    const updatedProject = await projectModel.updateProject(project);

    return updatedProject;
}

exports.deleteProject = async (id) => {
    const deletedProject = await projectModel.deleteProject(id);

    return deletedProject;
}

exports.findProjectTags = async (id) => {
    const data = await projectModel.findProjectTags(id);

    return data;
}

exports.addProjectTags = async (id, tags) => {
    const tagData = tags.map(tag => [Number(id), tag.ID]);
    const data = await projectModel.addProjectTags(tagData);

    return data;
}