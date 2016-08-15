const Promise = require('bluebird');
const Type = require('./Type');

const DEFAULTS = {
    Iterable:  null,
    valueType: null
};

class TypeIterable extends Type(DEFAULTS) {
    constructor(Iterable, valueType, props) {
        super({
            Iterable,
            valueType,
            ...props
        });
    }

    toJS(value) {
        const { Iterable, valueType } = this;

        let list = new Iterable(value);
        list = list.map(x => valueType.toJS(x));

        return list;
    }

    toMongo(value) {
        const { valueType } = this;

        return value
            .map(x => valueType.toMongo(x))
            .toJS();
    }

    /**
     * Validate all values in the iterable
     * @param {Iterable} value
     * @param {String} fieldName
     * @return {Promise<Iterable>} newValue
     */

    validateEntries(value, fieldName) {
        const { valueType } = this;

        return Promise.mapSeries(value, function(val) {
            return valueType.validate(val, fieldName);
        });
    }

    /**
     * Validate all values in the iterable and the iterable itself
     * @param {Iterable} value
     * @param {String} fieldName
     * @return {Promise<Iterable>} newValue
     */

    validate(value, fieldName) {
        // Validate the iterable first
        return super.validate(value, fieldName)
        .then(iterable => this.validateEntries(iterable, fieldName));
    }
}

module.exports = TypeIterable;
