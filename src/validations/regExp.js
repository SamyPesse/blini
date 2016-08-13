
/**
 * Enforce that the value match a RegExp.
 * 
 * @param {RegExp} re
 * @param {String} message
 * @return {Function}
 */

function regExp(re, message) {
    message = message || `Value should match ${re}`;

    return function(value) {
        if (re.test(value)) {
            throw new Error(message);
        }

        return value;
    };
}

module.exports = regExp;
