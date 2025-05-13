const { logger } = require('../helpers/logger');
const Joi = require('joi');

const ProjectService = require('../services/ProjectService');
const TagService = require('../services/TagService');
const { CreateProjectSchema, UpdateProjectSchema } = require('../schemas/ProjectSchema');
const { BaseTagSchema } = require('../schemas/TagSchema');

const { serializeProjects } = require('../helpers/serializeProjects');

const prefix = 'api/v1/projects';

exports.findAll = async (req, res) => {
    
    try {
        const { page = 1, limit = 10, order="ID" } = req.query;

        const data = await ProjectService.findAll(page, limit, order);
        if (data.length > 0) {

            const projects = data.map(project => serializeProjects(project, req));

            return res.status(200).json( projects );
        }

        return res.status(404)
                .json({
                    message: 'No projects found.'
                });

    } catch (error) {

        logger.error('Encountered an error with ProjectController.findAll.', error);

        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });

    }

}

exports.getById = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await ProjectService.getById(id);

        if (data.length > 0) {
            const project = serializeProjects(data[0], req);

            return res.status(200)
            .json( project )
        }

        return res.status(404)
                .json({
                    message: "Project not found."
                });

    } catch (error) {
        logger.error('Encountered an error with ProjectController.getById.', error);

        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
    }

}

exports.findProjectTags = async (req, res) => {
    
    try {
        const { id } = req.params;

        const exists = await ProjectService.getById(id);
        if (!exists) {
            return res.status(404)
                .json({
                    message: 'Project not found'
                });
        }
    
        const tags = await ProjectService.findProjectTags(id);
        if (!tags) {
            return res.status(404)
                .json({
                    message: 'Project tags not found.'
                });
        }

        // Need to figure out how to filter output to schema. Doesn't strictly filter data.
        const { value } = BaseTagSchema.validate(tags);
    
        return res.status(200)
            .json(value);
    } catch (error) {

        logger.error('Error whilst fetching project tags.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });

    }
}