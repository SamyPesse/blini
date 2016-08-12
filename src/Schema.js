const { Record, Map } = require('immutable');

const DEFAULTS = {
    fields: new Map()
};

class Schema extends Record(DEFAULTS) {
    constructor(fields) {
        super({
            fields: new Map(fields)
        });
    }

    /**
     * Get all default values for this schema
     * @param {Object} object
     */

    getDefaultValues() {
        const { fields } = this;
        return fields
            .map((type) => null)
            .toJS();
    }

    /**
     * Get type for a field
     * @param {String} field
     * @return {Type}
     */

    getType(field) {
        const { fields } = this;
        return fields.get(field);
    }

    /**
     * Transform a document to pure JSON for Mongo.
     * @param {Document} doc
     * @return {JSON} json
     */

    toMongo(doc) {
        const { fields } = this;

        return fields
            .map(function(type, key) {
                let value = doc.get(key);
                return type.toMongo(value);
            })
            .toJS();
    }
}

module.exports = Schema;
