const is = require('is');
const toFactory = require('to-factory');
const { Map, List } = require('immutable');

const fieldPath = require('../utils/fieldPath');
const TypeIterable = require('./Iterable');

/**
 * Map is an unordered Iterable of (key, value) pairs
 *
 * @param {Type} type
 * @return {Type}
 */

class TypeMap extends TypeIterable {
    constructor(type, props) {
        super(Map, type, props);
    }

    /**
     * Resolve a field key (ex: "members.user")
     * into a list of key path "members[0].user".
     *
     * @param {Mixed} value
     * @param {String} field
     * @return {List<KeyPath>} keyPaths
     */

    resolveFieldPath(value, field) {
        const { valueType } = this;
        const parts = fieldPath.split(field);
        const part  = parts.shift();
        const next  = fieldPath.join(...parts);

        const innerValue = value.get(part);

        if (is.undef(innerValue)) {
            return List();
        }

        return valueType.resolveFieldPath(innerValue, next)
            .map(path => fieldPath.join(field, path));
    }
}

module.exports = toFactory(TypeMap);
