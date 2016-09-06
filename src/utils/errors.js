const ExtendableError = require('es6-error');

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
