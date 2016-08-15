const { ObjectID } = require('mongodb');
const TypeNative = require('./Native');

module.exports = TypeNative(ObjectID);
