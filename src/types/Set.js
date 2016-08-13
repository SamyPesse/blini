const toFactory = require('to-factory');
const { Set } = require('immutable');

const TypeIterable = require('./Iterable');

class TypeSet extends TypeIterable {
    constructor(type, props) {
        super(Set, type, props);
    }
}

module.exports = toFactory(TypeSet);
