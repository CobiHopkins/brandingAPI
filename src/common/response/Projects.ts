export interface ProjectResponse {
    id: number;
    name: string;
    description: string;
    githubUrl?: string;
    websiteUrl?: string;
    imageUrl?: string;
    trelloUrl?: string;
    content?: string;
    tags: string[];
    dateRegistered: Date;
    dateUpdated: Date;
}

export interface GetProjectsResponse {
    projects: ProjectResponse[];
    total: number;
    page: number;
    limit: number;
}

export interface UpdateProjectResponse {
    id: number;
    updated: boolean;
}

export interface DeleteProjectResponse {
    id: number;
    deleted: boolean;
}

export interface GetProjectTagResponse {
    id: number;
}