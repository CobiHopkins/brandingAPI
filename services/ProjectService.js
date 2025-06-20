const ProjectModel = require('../models/ProjectModel');

exports.findAll = async (page, limit, order) => {
    const data = await ProjectModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const project = await ProjectModel.getById(id);

    return project;
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