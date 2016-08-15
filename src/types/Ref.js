const toFactory = require('to-factory');
const Type = require('./Type');
const TypeObjectID = require('./ObjectID');

const DEFAULTS = {
    // Name of the referenced model
    modelName: null,
    // Type to represent the ref
    type:      TypeObjectID()
};

class TypeRef extends Type(DEFAULTS) {
    constructor(modelName, props) {
        super({
            modelName,
            ...props
        });
    }

    toJS(value) {
        return this.type.toJS(value);
    }

    toMongo(value) {
        return this.type.toMongo(value);
    }

    /**
     * Resolve this reference in a connection.
     * @param {Connection} connection
     * @param {Mixed} value
     * @return {Promise<Document>}
     */

    resolve(connection, value) {
        const { modelName } = this;
        const Model = connection.models[modelName];

        return Model.findById(value).exec();
    }
}

module.exports = toFactory(TypeRef);
