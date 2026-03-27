const Joi = require('joi');

exports.BaseProjectSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    title: Joi.string()
        .pattern(/^[a-zA-Z0-9 ]+$/)
        .min(3)
        .max(20)
        .required(),
    
    description: Joi.string()
        .min(10)
        .required(),
    content: Joi.string()
        .min(10)
        .required(),
    tags: Joi.array()
        .items(
            Joi.string()
                .pattern(/^[a-zA-Z0-9 .#]+$/)
                .min(1)
                .required()
        )
        .single()
        .min(1),
    
    githubUrl: Joi.string()
        .uri()
        .pattern(/^https:\/\/github\.com(\/[\w\-]*)*$/) 
        .required(),
    imageUrl: Joi.string()
        .uri(),
    websiteUrl: Joi.string()
        .uri(),
    trelloUrl: Joi.string()
        .uri()
        .pattern(/^https:\/\/trello\.com(\/[\w\-]*)*$/)
});