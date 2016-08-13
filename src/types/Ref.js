const toFactory = require('to-factory');
const Type = require('./Type');

const DEFAULTS = {
    // Name of the referenced model
    modelName: null
};

class TypeRef extends Type(DEFAULTS) {
    constructor(modelName, props) {
        super({
            modelName,
            ...props
        });
    }

    toJS(value) {

    }

    toMongo(value) {

    }

}

module.exports = toFactory(TypeRef);
