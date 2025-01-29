const projectService = require('../services/project');

exports.findAll = async (req, res) => {
    
    try {
        const projects = await projectService.findAll();

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

        const project = await project.getById(id);

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

