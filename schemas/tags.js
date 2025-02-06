const Joi = require('joi');

exports.BaseTagSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    name: Joi.string()
        .pattern(/^[a-zA-Z .#]+$/)
        .min(2)
        .max(30)
        .required(),
    
    colour: Joi.string()
            .pattern(/^[a-zA-Z0-9]+$/)
            .min(6)
            .max(6)
            .required(),
    
}).unknown(false);

exports.CreateTagSchema = exports.BaseTagSchema.keys({
    id: Joi.forbidden()
}).unknown(false);