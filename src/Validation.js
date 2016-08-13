
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
     * @return {Mixed}
     */

    validate(value) {
        return this.fn(value);
    }

    /**
     * Enforce that a value is defined
     * @param {String} message
     * @return {Validation}
     */

    static required(message) {
        message = message || 'Field is required';

        return new Validation(function(value) {
            if (typeof value === 'undefined') {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Default the value if non existant
     * @param {Mixed} defaultValue
     * @return {Validation}
     */

    static default(defaultValue) {
        return new Validation(function(value) {
            if (typeof value === 'undefined') {
                return defaultValue;
            }

            return value;
        });
    }

    /**
     * Enforce that the value has a length superior to "min"
     * @param {Number} min
     * @param {String} message
     * @return {Validation}
     */

    static minLength(min, message) {
        message = message || `Value should be longer than ${min} characters`;

        return new Validation(function(value) {
            if (value.length < min) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Enforce that the value has a length inferior to "max"
     * @param {Number} max
     * @param {String} message
     * @return {Validation}
     */

    static maxLength(max, message) {
        message = message || `Value should be less than ${max} characters`;

        return new Validation(function(value) {
            if (value.length > max) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Enforce that the value match a RegExp
     * @param {RegExp} re
     * @param {String} message
     * @return {Validation}
     */

    static regExp(re, message) {
        message = message || `Value should match ${re}`;

        return new Validation(function(value) {
            if (re.test(value)) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Enforce that the value is a constant
     * @param {Array<Mixed>} constants
     * @param {String} message
     * @return {Validation}
     */
    static oneOf(constants, message) {
        message = message || `Value should be one of ${constants.join(', ')}`;

        return new Validation(function(value) {
            if (constants.indexOf(value) < 0) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Prevent a list or string to have more than "max",
     * it doesn't throw error.
     *
     * @param {Number} max
     * @return {Validation}
     */

    static limitAt(max) {
        return new Validation(function(value) {
            return value.slice(0, max);
        });
    }
}

module.exports = Validation;
