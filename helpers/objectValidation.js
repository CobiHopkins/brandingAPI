const { ProjectBase, OutgoingProject } = require('../interfaces/projects');

exports.objectValidation = (obj, validator) => {
    return obj instanceof validator;
}