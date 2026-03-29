const TagModel = require('../models/TagsModel');

const findAll = async (page, limit, order) => {
    const data = await TagModel.findAll(page, limit, order);

    return data;
}

const getById = async (id) => {
    const data = await TagModel.getById(id);

    return data;
}

export const TagService = {
    findAll: findAll,
    getById: getById
}