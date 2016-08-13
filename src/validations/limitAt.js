
/**
 * Prevent a list or string to have more than "max",
 * it doesn't throw error.
 *
 * @param {Number} max
 * @return {Function}
 */

function limitAt(max) {
    return function(value) {
        return value.slice(0, max);
    };
}

module.exports = limitAt;
