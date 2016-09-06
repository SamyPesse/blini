const is = require('is');

/**
 * Default the value if non existant.
 *
 * @param {Mixed} def
 * @return {Function}
 */

function defaultValue(def) {
    return function(value) {
        if (is.undefined(value)) {
            return def;
        }

        return value;
    };
}

module.exports = defaultValue;
