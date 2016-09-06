const { ValidationError } = require('../utils/errors');

/**
 * Enforce that the value has a length inferior to "max".
 *
 * @param {Number} max
 * @param {String} message
 * @return {Function}
 */

function maxLength(max, message) {
    return function(value, path) {
        if (value.length > max) {
            throw new ValidationError({
                message: message || `"${path}" should be less than ${max} characters`,
                value,
                path
            });
        }

        return value;
    };
}

module.exports = maxLength;
