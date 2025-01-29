export interface ProjectBase {
    id: string;
    tags: string[];
    title: string;
    description: string;
    url: string;
}

export interface OutgoingProject extends ProjectBase {
    dateRegistered: string;
    dateUpdated: string | null;
}