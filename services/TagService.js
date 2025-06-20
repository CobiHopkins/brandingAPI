const TagModel = require('../models/TagsModel');

exports.findAll = async (page, limit, order) => {
    const data = await TagModel.findAll(page, limit, order);

    return data;
}

exports.getById = async (id) => {
    const data = await TagModel.getById(id);

    return data;
}
