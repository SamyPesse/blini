const ExtendableError = require('es6-error');


/**
 * An error to represent a field validation that failed.
 * @param {String} [properties.message]
 * @param {String} [properties.path]
 * @param {Mixed}  [properties.value]
 */
class ValidationError extends ExtendableError {
    constructor(properties) {
        super(properties.message);

        this.path  = properties.path;
        this.value = properties.value;
    }
}

module.exports = {
    ValidationError
};
