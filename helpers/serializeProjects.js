const { date } = require("joi");

const serializeProjects = (project, req) => {
    const {
        ID,
        title,
        description,
        githubUrl,
        imageUrl,
        websiteUrl,
        trelloUrl,
        content,
        dateRegistered,
        dateUpdated
    } = project;

    const links = {
        tags: `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path.replace(/\/$/, '')}/${ID}`
    }

    return {
        ID,
        title,
        description,
        githubUrl,
        imageUrl,
        websiteUrl,
        trelloUrl,
        content,
        dateRegistered,
        dateUpdated,
        links
    }
}

module.exports = {
    serializeProjects
}