
class Validation {
    /**
     * Create a validation from a function
     * @param {Function(value)} fn
     */

    constructor(fn) {
        this.fn = fn;
    }

    /**
     * Validate a value, throws and error if failed
     * @param {Mixed} value
     */

    validate(value) {
        this.fn(value);
    }

    static minLength(min, message) {
        return new Validation(function(value) {
            if (value.length < min) {
                throw new Error(message);
            }
        });
    }

    static maxLength(max, message) {
        return new Validation(function(value) {
            if (value.length > max) {
                throw new Error(message);
            }
        });
    }
}

module.exports = Validation;
