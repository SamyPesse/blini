const { Record } = require('immutable');

const Document = require('./Document');

/**
 * Create an extendable class for a schema
 *
 * @param {Schema} schema
 * @param {Connection} connection
 * @param {String} collection
 * @return {Class} ModelClass
 */
function Model(schema, connection, collection) {
    const fieldValues = schema.getDefaultValues();

    const modelValues = {
        ...fieldValues,
        ...Document.DEFAULTS
    };

    class ResultModel extends Record(modelValues) {
        constructor(values) {
            values = values || {};
            values.__schema = schema;
            values.__connection = connection;
            values.__collection = collection;
            super(values);
        }
    }

    // Mix in `Document` methods.
    for (const method in Document) {
        ResultModel.prototype[method] = Document[method];
    }

    return ResultModel;
}


module.exports = Model;
