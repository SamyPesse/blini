const { Record } = require('immutable');

const Type = require('./types');
const Document = require('./Document');
const DocumentStatics = require('./Document/statics');

const ModelOptions = Record({
    // Name of the collection
    collection:    null,
    // Discriminator filter
    discriminator: null
});

/**
 * Create an extendable class for a schema
 *
 * @param {Schema} schema
 * @param {Connection} connection
 * @param {String} modelName
 * @param {ModelOptions} options
 * @return {Class} ModelClass
 */
function Model(schema, connection, modelName, options = {}) {
    options = ModelOptions(options);

    // Add _id to schema if non existant
    if (!schema.hasField('_id')) {
        schema = schema.mergeFields({
            _id: Type.ObjectID()
        });
    }

    const fieldValues = schema.getDefaultValues();
    const collection = options.collection || modelName.toLowerCase();

    const modelValues = {
        ...fieldValues,
        ...Document.DEFAULTS
    };

    class ResultModel extends Record(modelValues, modelName) {
        get id() {
            return this._id;
        }
    }

    // Mix in `Document` methods.
    for (const method in Document) {
        ResultModel.prototype[method] = Document[method];
    }

    // Mix in `DocumentStatics` methods.
    for (const method in DocumentStatics) {
        ResultModel[method] = DocumentStatics[method];
    }

    // Static properties
    ResultModel.modelName  = modelName;
    ResultModel.schema     = schema;
    ResultModel.connection = connection;
    ResultModel.collection = collection;
    ResultModel.options    = options;
    ResultModel.Model      = ResultModel;

    // Register the model in the connection
    connection.models[modelName] = ResultModel;

    return ResultModel;
}


module.exports = Model;
