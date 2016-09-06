const { ValidationError } = require('../utils/errors');

/**
 * Enforce that the value has a length superior to "min".
 *
 * @param {Number} min
 * @param {String} message
 * @return {Function}
 */

function minLength(min, message) {
    return function(value, path) {
        if (value.length < min) {
            throw new ValidationError({
                message: message || `"${path}" should be longer than ${min} characters`,
                value,
                path
            });
        }

        return value;
    };
}

module.exports = minLength;
