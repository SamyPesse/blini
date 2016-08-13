const toFactory = require('to-factory');
const { List } = require('immutable');

const TypeIterable = require('./Iterable');

/**
 * Lists are ordered indexed dense collections, much like a JavaScript Array.
 *
 * @param {Type} type
 * @return {Type}
 */

class TypeList extends TypeIterable {
    constructor(type, props) {
        super(List, type, props);
    }
}

module.exports = toFactory(TypeList);
