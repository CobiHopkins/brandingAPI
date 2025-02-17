const TagModel = require('../models/tags');

exports.findAll = async (page, limit, order) => {
    const data = await TagModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const data = await TagModel.getById(id);

    return data;
}

exports.getByName = async (name) => {
    const data = await TagModel.getByName(name);

    return data;
}

exports.createTag = async (tag) => {
    const data = await TagModel.createTag(tag);

    return data;
}

exports.updateTag = async (tag) => {
    const data = await TagModel.updateTag(tag);

    return data;
}

exports.deleteTag = async (id) => {
    const data = await TagModel.deleteTag(id);

    return data;
}