import { ProjectResponse } from "../common/response/Projects";
import { Request } from "express";

const { date } = require("joi");

const serializeProjects = ({project, req}: { project: ProjectResponse, req: Request}) => {
    const {
        id,
        name,
        description,
        githubUrl,
        imageUrl,
        websiteUrl,
        trelloUrl,
        content,
        dateRegistered,
        dateUpdated
    } = project;

    return {
        id,
        name,
        description,
        githubUrl,
        imageUrl,
        websiteUrl,
        trelloUrl,
        content,
        dateRegistered,
        dateUpdated
    }
}

module.exports = {
    serializeProjects
}