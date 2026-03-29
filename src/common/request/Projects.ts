export interface GetProjectRequest {
    id: number;
}

export interface GetProjectsRequest {
    page: number;
    limit: number;
    order?: 'asc' | 'desc';
}

export interface AddProjectRequest {
    id: number;
    name: string;
    description: string;
    githubUrl?: string;
    websiteUrl?: string;
    imageUrl?: string;
    trelloUrl?: string;
    content?: string;
    tags?: string[];
}

export interface UpdateProjectRequest {
    id: number;
    name?: string;
    description?: string;
    githubUrl?: string;
    websiteUrl?: string;
    imageUrl?: string;
    trelloUrl?: string;
    content?: string;
    tags?: string[];
}

export interface DeleteProjectRequest {
    id: number;
}

export interface GetProjectTagsRequest {
    id: number;
}

export interface AddProjectTagsRequest {
    id: number;
    tags: { ID: number }[];
}