const { logger } = require('../helpers/logger');

const ProjectService = require('../services/project');
const TagService = require('../services/tags');
const { CreateProjectSchema, UpdateProjectSchema } = require('../schemas/projects');
const { BaseTagSchema } = require('../schemas/tags');

const prefix = 'api/v1/projects';

exports.findAll = async (req, res) => {
    
    try {
        const { page = 1, limit = 10, order="ID" } = req.query;

        const data = await ProjectService.findAll(page, limit, order);

        if (!data.length) {
            return res.status(404)
                .json({
                    message: 'No projects found.'
                });
        }

        const projects = data.map(project => {
            const { ID, title, description, url, dateRegistered, dateUpdated } = project;
    
            const links = {
                tags: `${req.protocol}://${req.get('host')}${req.originalUrl}/${ID}/tags`
            }

            return { ID, title, description, url, dateRegistered, dateUpdated, links }
        });

        return res.status(200).json( projects );
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

        const project = await ProjectService.getById(id);

        if (!project.length) {
            return res.status(404)
                .json({
                    message: "Project not found."
                });
        }

        return res.status(200)
            .json( project )

    } catch (error) {
        logger.error('Encountered an error with ProjectController.getById.', error);

        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
    }

}

exports.createProject = async (req, res) => {
    try {

        const project = req.body;
        const { error } = await CreateProjectSchema.validateAsync(project);

        if (error) {
            return res.status(400)
                .json({
                    message: error.message
            });
        }

        const {tags, ...newProject} = project;

        const result = await ProjectService.createProject(newProject);
        if (!result.affectedRows) {
            return res.status(400)
                .json({
                    message: "An error occured."
            });
        }

        /*
            TODO:
                Check if the values in tags already exist.
                Create new ones if they do not already exist.
                Add a record in project_tags linking a project with a tag via tag name.

                if tagging encounters an error, log and return error.
        */

        return res.status(200)
            .json({
                ID: result.insertId,
                Created: true
            });

    } catch (error) {
        logger.error('Encountered an error whilst creating project: ', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = req.body;
    
        const { error } = UpdateProjectSchema.validateAsync(project);
        if (error) {
            return res.status(400)
                .json({
                    message: error.message
                })
        }
        
        // Find a way to remove this call.
        const exists = await ProjectService.getById(id);
        if (!exists) {
            return res.status(404)
                .json({
                    message: 'Project not found'
                });
        }
    
        const updatedProject = {ID: id, ...project};
        const result = await ProjectService.updateProject(updatedProject);
        if (result.affectedRows) {
            return res.status(200)
                .json({
                    ID: id,
                    name: updatedProject.name,
                    Created: true
                });
        }
    } catch (error) {
        logger.error('Error whilst updating project: ', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });
    }

}

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        /*
        TODO:
            - Check permissions.
                - Only a single user should be able to delete projects.
        */
    
        const result = await ProjectService.deleteProject(id);
        if (result.affectedRows) {
            return res.status(200)
                .json({
                    ID: id,
                    Deleted: true
                });
            
            return;
        }
    } catch (error) {
        logger.error('Error whilst deleting project.', error);
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

exports.addProjectTags = async (req, res) => {

    try {
        const { id } = req.params;
        const { tags } = req.body;

        const exists = await ProjectService.getById(id);
        if (!exists) {
            return res.status(404)
                .json({
                    message: 'Project not found.'
                });
        }

        //Get tags and their associated ids;
        const tagIds = await TagService.getByName(tags);

        const result = await ProjectService.addProjectTags(id, tagIds);

        if (!result.affectedRows) {
            logger.info('Failed to add project tags.', [id, tags]);
            return res.status(400)
                .json({
                    message: 'Something went wrong.'
                });
        }

        return res.status(200)
            .json({
                ID: id,
                Created: true
            });

    } catch (error) {

        logger.error('Error whilst adding project tags.', error);
        return res.status(500)
            .json({
                message: 'An unexpected error occurred. Please try again later.'
            });

    }

}