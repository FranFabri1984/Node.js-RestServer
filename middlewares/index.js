const valFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-rol');
const validateFile = require('../middlewares/validate-file');

module.exports = {
    ...valFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}

