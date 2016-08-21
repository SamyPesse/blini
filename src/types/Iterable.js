const Promise = require('bluebird');
const { List } = require('immutable');

const fieldPath = require('../utils/fieldPath');
const Change = require('../Change');
const Type = require('./Type');
const MixedType = require('./Mixed');

const DEFAULTS = {
    Iterable:  null,
    valueType: null
};

class TypeIterable extends Type(DEFAULTS) {
    constructor(Iterable, valueType = MixedType(), props = {}) {
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

    /**
     * Compare two iterable values to determine a list of changes operations.
     *
     * @param {Iterable} initial
     * @param {Iterable} expected
     * @param {String} fieldPath
     * @return {List<Change>} changes
     */

    compare(initial, expected, base) {
        const { valueType } = this;
        let changes = List();

        // Added / Modified entries
        expected.forEach(function(expectedValue, index) {
            const field = fieldPath.join(base, index);
            const initialValue = initial.get(index);

            changes = changes.concat(
                valueType.compare(initialValue, expectedValue, field)
            );
        });

        // Removed entries
        initial.slice(expected.size).forEach(function(initialValue, index) {
            const name = typeof index === 'number'? (expected.size + index) : index;
            const field = fieldPath.join(base, name);

            changes = changes.push(
                Change.unset(field)
            );
        });

        return changes;
    }
}

module.exports = TypeIterable;
