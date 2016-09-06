const { ValidationError } = require('../utils/errors');

/**
 * Enforce that a value is defined
 * @param {String} message
 * @return {Function}
 */

function required(message) {
    return function(value, path) {
        if (typeof value === 'undefined') {
            throw new ValidationError({
                message: message || `"${path}" is required`,
                value,
                path
            });
        }

        return value;
    };
}

module.exports = required;
