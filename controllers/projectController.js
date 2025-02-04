const Joi = require('joi');
const { logger } = require('../helpers/logger');

const projectService = require('../services/project');
const { BaseProjectSchema, CreateProjectSchema, UpdateProjectSchema } = require('../schemas/projects');

exports.findAll = async (req, res) => {
    
    try {
        const { page = 1, limit = 10, order="ID" } = req.query;

        const projects = await projectService.findAll(page, limit, order);

        if (!projects.length) {
            res.status(404).json({
                message: 'No projects found'
            });

            return;
        }

        res.status(200).json( projects );
    } catch (error) {
        logger.error('Encountered an error with findAll: ', error);
    }

}

exports.getById = async (req, res) => {

    try {
        const { id } = req.params;

        const project = await projectService.getById(id);

        if (!project.length) {
            res.status(404).json("Not found");
            return;
        }

        res.status(200).json( project )

    } catch (error) {
        logger.error('Error on findAll Projects: ', error);
    }

}

exports.createProject = async (req, res) => {
    try {

        const project = req.body;
        const { error } = await CreateProjectSchema.validateAsync(project);

        if (error) {
            res.status(400)
                .json({
                    message: error.message
            });

            return;
        }

        const {tags, ...newProject} = project;

        const result = await projectService.createProject(newProject);
        if (!result.affectedRows) {
            res.status(400)
                .json({
                    message: "An error occured."
            });

            return;
        }

        /*
            TODO:
                Check if the values in tags already exist.
                Create new ones if they do not already exist.
                Add a record in project_tags linking a project with a tag via tag name.

                if tagging encounters an error, log and return error.
        */

        res.status(200)
            .json({
                ID: result.insertId,
                Created: true
            });

    } catch (error) {
        logger.error('Encountered an error whilst creating project: ', error);
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = req.body;
    
        const { error } = await UpdateProjectSchema.validateAsync(project);
        if (error) {
            res.status(400)
                .json({
                    message: error.message
                })
            return;
        }
        
        // Find a way to remove this call.
        const exists = await projectService.getById(id);
        if (!exists) {
            res.status(404)
                .json({
                    message: 'Project not found'
                })
            return;
        }
    
        const updatedProject = {ID: id, ...project};
        const result = await projectService.updateProject(updatedProject);
        if (result.affectedRows) {
            res.status(200)
                .json({
                    ID: id,
                    Created: true
                });
            return;
        }
    } catch (error) {
        logger.error('Error whilst updating project: ', error);
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
    
        const result = await projectService.deleteProject(id);
        if (result.affectedRows) {
            res.status(200)
                .json({
                    ID: id,
                    Deleted: true
                });
            
            return;
        }
    } catch (error) {
        logger.error('Error whilst deleting project.', error);
    }
}