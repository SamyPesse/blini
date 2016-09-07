const { ValidationError } = require('../utils/errors');

/**
 * Enforce that the value is a constant.
 *
 * @param {Array<Mixed>} constants
 * @param {String} message
 * @return {Validation}
 */
function oneOf(constants, message) {
    return function(value, path) {
        if (constants.indexOf(value) < 0) {
            throw new ValidationError({
                message: message || `"${path}" should be one of ${constants.join(', ')}`,
                value,
                path
            });
        }

        return value;
    };
}

module.exports = oneOf;
