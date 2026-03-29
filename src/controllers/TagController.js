const { logger } = require('../helpers/logger');

const TagService = require('../services/TagService');
const { BaseTagSchema, CreateTagSchema } = require('../schemas/TagSchema');

const prefix = 'api/v1/tags';

exports.findAll = async (req, res) => {

    try {
        const { page = 1, limit = 10, order = 'ID' } = req.params;

        const data = await TagService.findAll(page, limit, order);
        if (!data) {
            logger.info('findAll: no tags found.');

            return res.status(404)
                .json({
                    message: 'No tags found.'
                });
        }

        return res.status(200)
            .json(data)
    } catch (error) {

        logger.error('Encountered an error on TagsController.findAll.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
            
    }

}

exports.getById = async (req, res) => {

    try {
        const { id } = req.query;

        const data = await TagService.getById(id);
        if (!data) {
            logger.info('Failed to get tag by ID');
            return res.status(404)
                .json({
                    message: 'Tag not found.'
                })
        }

        return res.status(200)
            .json(data);

    } catch (error) {
        logger.error('Encountered an error on Tags.getById.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
    }
}