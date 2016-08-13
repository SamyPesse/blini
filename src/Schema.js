const toFactory = require('to-factory');
const { Map } = require('immutable');

const Type = require('./types/Type');

const DEFAULTS = {
    fields: new Map()
};

class Schema extends Type(DEFAULTS) {
    constructor(fields = {}) {
        fields = new Map(fields);

        super({
            fields
        });
    }

    toMongo(doc) {
        const { fields } = this;

        return fields
            .map(function(type, key) {
                let value = doc.get(key);
                return type.toMongo(value);
            })
            .toJS();
    }

    toJS(json) {
        const { fields } = this;

        return fields
            .map(function(type, key) {
                let value = json[key];
                return type.toJS(value);
            })
            .toJS();
    }

    /**
     * Get default values for this schema
     * @return {Object} values
     */

    getDefaultValues() {
        const { fields } = this;
        
        return fields
            .map(v => undefined)
            .toJS();
    }
}

module.exports = toFactory(Schema);
