const is = require('is');
const Promise = require('bluebird');
const Immutable = require('immutable');
const { List, Map } = Immutable;

const populateOne = require('./Query/populateOne');

const DEFAULTS = {
    // Previous version of the document remotly
    __prevRevision: null,
    // Map of populated fields (path -> Ref)
    __populated: Map()
};

const Document = {
    DEFAULTS,

    /**
     * Get the schema for this document
     * @return {Schema} schema
     */

    getSchema() {
        return this.constructor.schema;
    },

    /**
     * Get the connection for this document
     * @return {Connection} connection
     */

    getConnection() {
        return this.constructor.connection;
    },

    /**
     * Get the name of the collection
     * @return {String} collection
     */

    getCollectionName() {
        return this.constructor.collection;
    },

    /**
     * Validate this document against the schema.
     * @return {Promise<Document>}
     */

    validate() {
        const schema = this.getSchema();
        return schema.validate(this);
    },

    /**
     * Save the document to mongo DB
     * @return {Promise<Document>}
     */

    save() {
        const doc = this;

        return this.constructor.getCollection()
        .then(function(col) {
            const json = doc.toMongo();

            return new Promise(function(resolve, reject) {
                col.save(json, function(err) {
                    if (err) reject(err);
                    else resolve();
                });
            });
        })
        .then(function() {
            return doc.cleanup();
        });
    },

    /**
     * Remove the document
     * @return {Promise}
     */

    remove() {
        return this.constructor.remove({
            _id: this._id
        });
    },

    /**
     * Populate a document reference.
     * @param {String|Map<String:Object>|List<String>} field
     * @param {Object} cache?
     * @return {Promise<Document>}
     */

    populate(fields, cache) {
        if (List.isList(fields) || is.array(fields)) {
            fields = fields.map(field => [field, field]);
        }
        else if (is.string(fields)) {
            fields = { [fields]: {} };
        }

        fields =  new Map(fields);

        return populateOne(fields, this, cache);
    },

    /**
     * Cleanup a document by removing all pending revions
     * @return {Document}
     */

    cleanup() {
        return this.merge({
            __prevRevision: null
        });
    },

    /**
     * Test whaever the document exists remotly
     * @return {Boolean} clean
     */

    isSaved() {
        return Boolean(this.get('_id'));
    },

    /**
     * Test whatever the document is clean (nothing to save)
     * @return {Boolean} clean
     */

    isClean() {
        const savedRevision = this.__prevRevision;

        if (!this.isSaved()) {
            return false;
        }

        if (!savedRevision) {
            return true;
        }

        return Immutable.is(
            savedRevision.remove('__prevRevision'),
            this.remove('__prevRevision')
        );
    },

    /**
     * Test whatever a field has been populated
     * @param {String} field
     * @return {Boolean} populated
     */

    isPopulated(field) {
        return Boolean(this.getPopulatedRef(field));
    },

    /**
     * Return the value of the reference that has been populated for field "field"
     * @param {String} field
     * @return {Ref} ref
     */

    getPopulatedRef(field) {
        const { __populated } = this;
        // TODO: handle deep population
        return __populated.get(field);
    },

    /**
     * Return the MongoDB representation of this document
     * @return {JSON} json
     */

    toMongo() {
        const schema = this.getSchema();
        return schema.toMongo(this);
    }
};

module.exports = Document;
