const valFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-rol');

module.exports = {
    ...valFields,
    ...validateJWT,
    ...validateRoles,
}

