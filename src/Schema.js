const toFactory = require('to-factory');
const { Map } = require('immutable');

const Type = require('./types/Type');
const TypeIterable = require('./types/Iterable');

const FIELD_SEPARATOR = '.';

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
     * Get a type by its field
     *
     * @param {String} field
     * @return {Type} type
     */

    getFieldByKey(field) {
        const { fields } = this;
        return fields.get(field);
    }

    /**
     * Return true if a field is defined in the schema
     *
     * @param {String} field
     * @return {Boolean} exists
     */

    hasField(field) {
        const { fields } = this;
        return fields.has(field);
    }

    /**
     * Resolve a field key to a Type.
     * It resolves sub-document and iterable by spiting field by dots
     *
     * @param {String} field
     * @return {Type} type
     */

    resolveFieldByKey(field) {
        const parts = field.split(FIELD_SEPARATOR);

        return parts.reduce(function(type, part, index) {
            if (!type) {
                return;
            }

            if (type instanceof TypeIterable) {
                type = type.valueType;
            }

            if (!(type instanceof Schema)) {
                return;
            }

            return type.getFieldByKey(part);
        }, this);
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

    /**
     * Merge new fields into this schema
     * @param {Object|Map} newFields
     * @return {Schema} schema
     */

    mergeFields(newFields) {
        const { fields } = this;
        return this.merge({
            fields: fields.merge(newFields)
        });
    }

    /**
     * Validate a document aginst this schema.
     * @param {Document} doc
     * @return {Promise<Document>}
     */

    validate() {
        
    }
}

module.exports = toFactory(Schema);
