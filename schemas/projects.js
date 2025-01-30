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

    tags: Joi.array()
        .items(
            Joi.string()
                .pattern(/^[a-zA-Z0-9 .#]+$/)
                .min(1)
                .required()
        )
        .single()
        .min(1)
        .required(),
    
    url: Joi.string()
        .uri()
        .pattern(/^https:\/\/github\.com(\/[\w\-]*)*$/) 
        .required()
});

exports.CreateProjectSchema = exports.BaseProjectSchema.keys({
    id: Joi.forbidden()
});  

exports.UpdateProjectSchema = exports.BaseProjectSchema.fork(
    ['title', 'description', 'url'], (schema) => schema.optional())
    .keys({ 
        id: Joi.forbidden(),
        tags: Joi.forbidden()
     })
     .min(1);