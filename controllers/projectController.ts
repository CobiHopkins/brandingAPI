import { ProjectBase, OutgoingProject } from '../interfaces/projects';
const projectService = require('../services/project');

exports.findAll = async (req, res) => {
    
    try {
        const { page = 1, limit = 10, order="ID" } = req.query;

        const projects: [ OutgoingProject ] = await projectService.findAll(page, limit, order);

        if (!projects.length) {
            res.status(404).json({
                message: 'No projects found'
            });

            return;
        }

        res.status(200).json( projects );
    } catch (error) {
        throw new Error('An error occured during GET: ', error);
    }

}

exports.getById = async (req, res) => {

    try {
        const { id } = req.params;

        const project = await projectService.getById(id);

        if (!project.length) {
            res.status(404).json({
                message: 'Project not found.'
            }); 
            return;
        }

        res.status(200).json( project )

    } catch (error) {
        throw new Error('An error occured:', error);
    }

}

exports.createProject = async (req, res) => {

}

exports.updateProject = async (req, res) => {

}

exports.deleteProject = async (req, res) => {

}

