const tagModel = require('../models/tags');

exports.findAll = async (page, limit, order) => {
    const data = await tagModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const data = await tagModel.getById(id);

    return data;
}

exports.getByName = async (name) => {
    const data = await tagModel.getByName(name);

    return data;
}

exports.createTag = async (tag) => {
    const data = await tagModel.createTag(tag);

    return data;
}

exports.updateTag = async (tag) => {
    const data = await tagModel.updateTag(tag);

    return data;
}

exports.deleteTag = async (id) => {
    const data = await tagModel.deleteTag(id);

    return data;
}