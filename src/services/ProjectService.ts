import { GetProjectRequest, GetProjectsRequest, GetProjectTagsRequest, AddProjectTagsRequest } from "../common/request/Projects";

import { ProjectModel } from '../models/ProjectModel';


const GetAllProjects = async ({page, limit, order}: GetProjectsRequest) => {
    
}

const GetProjectById = async ({ id }: GetProjectRequest) => {
    
}

const GetProjectTags = async ({ id }: GetProjectTagsRequest) => {
    
}

const AddProjectTags = async ({ id, tags }: AddProjectTagsRequest) => {
    
}

export const ProjectService = {
    GetAllProjects: GetAllProjects,
    GetProjectById: GetProjectById,
    GetProjectTags: GetProjectTags,
    AddProjectTags: AddProjectTags,
}