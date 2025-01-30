const Joi = require('joi');

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
        console.error('An error occured during GET: ', error);
        throw new Error('An error occured during GET.');
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
        console.error('Error during get: ', error);
        throw new Error('An error occured.');
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
        // TODO: Winston Error Logging.

        console.error('Something went wrong: ', error);
        throw new Error('Something went wrong.');
    }
}

exports.updateProject = async (req, res) => {

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

    /*
        TODO:
        Update the corresponding fields and return an object.

    */


}

exports.deleteProject = async (req, res) => {

}