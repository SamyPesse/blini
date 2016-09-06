
/**
 * Enforce that the value has a length superior to "min".
 *
 * @param {Number} min
 * @param {String} message
 * @return {Function}
 */

function minLength(min, message) {
    message = message || `Value should be longer than ${min} characters`;

    return function(value) {
        if (value.length < min) {
            throw new Error(message);
        }

        return value;
    };
}

module.exports = minLength;
