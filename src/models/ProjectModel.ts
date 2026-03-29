import { run_query } from '../helpers/db';
import { GetProjectRequest, GetProjectsRequest, GetProjectTagsRequest, AddProjectTagsRequest } from "../common/request/Projects";
import { GetProjectsResponse, GetProjectTagResponse } from '../common/response/Projects';

const GetAllProjects = async ({page, limit, order}: GetProjectsRequest) => {
    const offset = (page - 1) * limit;

}

const GetProjectById = async ({ id }: GetProjectRequest) => {
    
}

export const ProjectModel = {
    GetAllProjects,
    GetProjectById,
}   