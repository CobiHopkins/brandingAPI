const { logger } = require('../helpers/logger');

const TagService = require('../services/tags');
const { BaseTagSchema, CreateTagSchema } = require('../schemas/tags');

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

exports.getByName = async (req, res) => {
    // likely going to be combining this into findAll;
}

exports.createTag = async (req, res) => {
    try {

        const tag = req.body;

        const { error } = CreateTagSchema.validate(tag);

        if (error) {
            logger.info('Invalid input when creating tag.', error);
            return res.status(400)
                .json({
                    message: error.message
                });
        }

        const { name } = tag;
        const exists = await TagService.getByName(name);

        if (exists.length > 0) {
            logger.info('Attempted to create a tag that already exists.', name);
            return res.status(409)
                .json({
                    message: 'Tag already exists with this name.'
                });
        }

        const result = await TagService.createTag(tag);
        if (result.errno == 1062 || !result.affectedRows) {
            logger.error('Failed to create new tag.', tag.name);
            return res.status(400)
                .json({
                    message: 'Tag with name already exists.'
                });
        }

        return res.status(201)
            .json({
                ID: result.insertId,
                name: name,
                Created: true
            });

    } catch (error) {

        logger.error('Encountered an error whilst creating tag.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });

    }
}

exports.updateTag = async (req, res) => {
    
    try {
        const { id } = req.params;
        const tag = req.body;

        const { error } = BaseTagSchema.validate(tag);
        if (error) {
            logger.info('Failed to update a tag', error);
            return res.status(400)
                .json({
                    message: error.message
                });
        }

        const exists = await TagService.getById(id);
        if (exists) {
            logger.info('Failed to find a tag with the given ID.', id);
            return res.status(404)
                .json({
                    message: 'Tag not found.'
                });
        }

        const newTag = {ID: id, ...tag};
        const result = await TagService.updateTag(newTag);
        if (!result.affectedRows) {
            logger.info('Failed to update tag.', result);
            return res.status(400)
                .json({
                    message: 'Something went wrong.'
                });
        }

        return res.status(200)
            .json({
                ID: id,
                Updated: true
            });
    } catch (error) {
        logger.error('Encountered an error whilst updating tag.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            })
    }

}

exports.deleteTag = async (req, res) => {

    try {
            const { id } = req.params;
        
            const result = await TagService.deleteTag(id);
            if (!result.affectedRows) {
                return res.status(400)
                    .json({
                        message: 'An error occurred.'
                    });
                
            }

            return res.status(200)
                    .json({
                        ID: id,
                        Deleted: true
                    });

        } catch (error) {

            logger.error('Error whilst deleting project.', error);
            return res.status(500)
                .json({
                    message: 'Something went wrong. Please try again later.'
                });

        }

}