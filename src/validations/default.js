const is = require('is');

/**
 * Default the value if non existant.
 * 
 * @param {Mixed} defaultValue
 * @return {Function}
 */

function defaultValue(defaultValue) {
    return function(value) {
        if (is.undefined(value)) {
            return defaultValue;
        }

        return value;
    };
}

module.exports = defaultValue;
