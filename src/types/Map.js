const toFactory = require('to-factory');
const { Map } = require('immutable');

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
}

module.exports = toFactory(TypeMap);
