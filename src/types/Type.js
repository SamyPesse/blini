const { List, Record } = require('immutable');

const DEFAULTS = {
    // List of validation functions
    validations: new List(),
    // Definition for the index concerning this field
    index:       null
};

function BaseType(defaultValues = {}) {
    const Type = Record({
        ...DEFAULTS,
        ...defaultValues
    });

    Type.prototype.toJS = (value => value);
    Type.prototype.toMongo = (value => value);

    return Type;
}

module.exports = BaseType;
