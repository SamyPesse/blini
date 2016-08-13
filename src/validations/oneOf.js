
/**
 * Enforce that the value is a constant.
 * 
 * @param {Array<Mixed>} constants
 * @param {String} message
 * @return {Validation}
 */
function oneOf(constants, message) {
    message = message || `Value should be one of ${constants.join(', ')}`;

    return function(value) {
        if (constants.indexOf(value) < 0) {
            throw new Error(message);
        }

        return value;
    };
}

module.exports = oneOf;
