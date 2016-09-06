const { ValidationError } = require('../utils/errors');

/**
 * Enforce that the value match a RegExp.
 *
 * @param {RegExp} re
 * @param {String} message
 * @return {Function}
 */

function regExp(re, message) {
    return function(value, path) {
        if (re.test(value)) {
            throw new ValidationError({
                message: message || `${path} should match ${re}`,
                value,
                path
            });
        }

        return value;
    };
}

module.exports = regExp;
