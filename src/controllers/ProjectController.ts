import { Request, Response } from "express";
import { logger } from "../helpers/logger";
import { ProjectService } from "../services/ProjectService";
import { TagService } from '../services/TagService';
import { GetProjectRequest, GetProjectsRequest, GetProjectTagsRequest } from "../common/request/Projects";
import { GetProjectsResponse, ProjectResponse, GetProjectTagResponse } from "../common/response/Projects";
import { serverInfo } from "../config";

const prefix= `${serverInfo.prefix}/projects`;

export const GetAllProjects = async (req: Request<{}, {}, GetProjectsRequest>, res: Response<GetProjectsResponse>) => {
    // TODO: 
    console.log(req);
}

export const GetByProjectId = async (req: Request<{}, {}, GetProjectRequest>, res: Response<ProjectResponse>) => {
    console.log(req);

}

export const GetProjectTagsByProjectId = async (req: Request<{}, {}, GetProjectTagsRequest>, res: Response<GetProjectTagResponse>) => {
    console.log(req);
}