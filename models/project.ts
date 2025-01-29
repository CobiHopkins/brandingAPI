import { ProjectBase, OutgoingProject } from '../interfaces/projects';
import { run_query } from '../helpers/db';

export const getAll = async (page, limit, order) => {
    let offset = limit * (page-1);

    const query: string = "SELECT * FROM projects";
    const values: any[] = [order, parseInt(limit), offset]
    const data: [ OutgoingProject ] = await run_query(query, values);
    return data;
}

export const getById = async (id: string) => {
    const query: string = "SELECT * FROM projects WHERE id = ?";
    const values: string[] = [id];
    const data: [ OutgoingProject ] = await run_query(query, values);
    return data;
}

export const createProject = async (project: ProjectBase) => {
    const query: string = "INSERT INTO projects SET ?";
    const data: object = await run_query(query, project);
    return data;
}

export const updateProject = async (project: ProjectBase) => {
    const query: string = "UPDATE projects SET ? WHERE id = ?";
    const values: [ProjectBase, string] = [project, project.id];
    const data: object = await run_query(query, values);
    return data;
}

export const deleteProject = async (id: string) => {
    const query: string = "DELETE * FROM projects WHERE id = ?";
    const values: string[] = [id];
    const data: object = await run_query(query, values);
    return data;
}

export default {
    getAll,
    getById,
    createProject,
    updateProject,
    deleteProject
}