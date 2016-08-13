const toFactory = require('to-factory');
const Type = require('./Type');

const TypeNative = fn => toFactory(class extends Type() {
    toJS(value) {
        return fn(value);
    }

    toMongo(value) {
        return fn(value);
    }
});

module.exports = TypeNative;
