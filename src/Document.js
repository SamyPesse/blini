const Promise = require('q');
const Immutable = require('immutable');

const DEFAULTS = {
    // Schema used for validating this document
    __schema:       null,
    // Connection used for working with the database
    __connection:   null,
    // Name of the collection
    __collection:   null,
    // Previous version of the document remotly
    __prevRevision: null
};

const Document = {
    DEFAULTS,

    /**
     * Get the schema for this document
     * @return {Schema} schema
     */

    getSchema() {
        return this.get('__schema');
    },

    /**
     * Get the connection for this document
     * @return {Connection} connection
     */

    getConnection() {
        return this.get('__connection');
    },

    /**
     * Get the name of the collection
     * @return {String} collection
     */

    getCollectionName() {
        return this.get('__collection');
    },

    /**
     * Get an interface to work with the collection.
     * @return {Promise<MongoDB.Collection>} collection
     */

    getCollection() {
        const connection = this.getConnection();
        const name = this.getCollectionName();
        return connection.getCollection(name);
    },

    /**
     * Save the document to mongo DB
     * @return {Promise<Document>}
     */

    save() {
        const doc = this;

        return this.getCollection()
        .then(function(col) {
            const json = doc.toMongo();

            return Promise.nfcall(col.save.bind(col), json);
        })
        .then(function() {
            return doc.cleanup();
        });
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
        return this.has('_id');
    },

    /**
     * Test whaever the document is clean (nothing to save)
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
     * Return the MongoDB representation of this document
     * @return {JSON} json
     */

    toMongo() {
        const schema = this.getSchema();
        return schema.toMongo(this);
    }
};

module.exports = Document;
