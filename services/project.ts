import { ProjectBase, OutgoingProject } from '../interfaces/projects';
import projectModel from '../models/project';

export const getAll = async (page, limit, order) => {
    const projects: [ OutgoingProject ] = await projectModel.getAll(page, limit, order);

    return projects;
}

export const getById = async (id: string) => {
    const project: [ OutgoingProject ] = await projectModel.getById(id);

    return project;
}

export const createProject = async (project: ProjectBase) => {
    const newProject: object = await projectModel.createProject(project);

    return newProject;
}

export const updateProject = async (project: ProjectBase) => {
    const updatedProject: object = await projectModel.updateProject(project);

    return updatedProject;
}

export const deleteProject = async (id: string) => {
    const deletedProject: object = await projectModel.deleteProject(id);

    return deletedProject;
}

export default {
    getAll,
    getById,
    createProject,
    updateProject,
    deleteProject
};