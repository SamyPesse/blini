const is = require('is');
const Promise = require('bluebird');
const Immutable = require('immutable');
const { List, Record } = Immutable;

const Change = require('../Change');

const DEFAULTS = {
    // List of validation functions
    validations: new List(),
    // Definition for the index concerning this field
    index:       null
};


const BaseType = (defaultValues = {}) => class extends Record({ ...DEFAULTS, ...defaultValues }) {

    /**
     * Deserialize a value from MongoDB
     * @param {JSON} json
     * @return {Mixed} value
     */

    toJS(value) {
        return value;
    }

    /**
     * Serialize a value for MongoDB
     * @param {Mixed} value
     * @return {JSON} json
     */

    toMongo(value) {
        return value;
    }

    /**
     * Validate a value using the type's validations
     * @param {Mixed} initialValue
     * @param {String} fieldPath
     * @return {Promise<Mixed>} newValue
     */

    validate(initialValue, fieldPath) {
        const { validations } = this;

        return Promise.reduce(validations, function(value, fn) {
            return fn(value, fieldPath);
        }, initialValue);
    }

    /**
     * Compare two values of this type to determine a change operation.
     * The basic implementation replace the whole field if different.
     *
     * @param {Mixed} initial
     * @param {Mixed} expected
     * @param {String} fieldPath
     * @return {List<Change>} changes
     */

    compare(initial, expected, fieldPath) {
        if (Immutable.is(initial, expected)) {
            return List();
        }

        if (!is.defined(expected)) {
            return List([
                Change.unset(fieldPath)
            ]);
        }

        return List([
            Change.set(fieldPath, this.toMongo(expected))
        ]);
    }
};

module.exports = BaseType;
