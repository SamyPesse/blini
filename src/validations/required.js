
/**
 * Enforce that a value is defined
 * @param {String} message
 * @return {Function}
 */

function required(message) {
    message = message || 'Field is required';

    return function(value) {
        if (typeof value === 'undefined') {
            throw new Error(message);
        }

        return value;
    };
}

module.exports = required;
