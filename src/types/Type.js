const Promise = require('q');
const { List, Record } = require('immutable');

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
     * @param {Mixed} value
     * @return {Promise<Mixed>} newValue
     */

    validate(value) {
        const { validations } = this;
        const initial = Promise(value);

        return validations.reduce((p, fn) => {
            return p.then(v => fn(v));
        }, initial);
    }
};

module.exports = BaseType;
