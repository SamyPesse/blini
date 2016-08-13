
/**
 * Enforce that the value has a length inferior to "max".
 * 
 * @param {Number} max
 * @param {String} message
 * @return {Function}
 */

function maxLength(max, message) {
    message = message || `Value should be less than ${max} characters`;

    return function(value) {
        if (value.length > max) {
            throw new Error(message);
        }

        return value;
    };
}

module.exports = maxLength;
