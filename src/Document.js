const {Stack} = require('immutable');

const DEFAULTS = {
    // Schema used for validating this document
    __schema:     null,
    // Connection used for working with the database
    __connection: null,
    // Name of the collection
    __collection: null,
    // Stack of unsaved revisions, each revision is a document
    __revisions:  Stack()
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
     * Get the collection of this document
     * @return {MongoDB.Collection} collection
     */

    getCollection() {
        const connection = this.getConnection();
        const name = this.getCollectionName();
        const { db } = connection;

        return db.collection(name);
    },

    /**
     * Save the document to mongo DB
     * @return {Promise<Document>}
     */

    save() {
        const doc = this;
        const schema = doc.getSchema();
        const collection = doc.getCollection();

        const json = schema.toMongo(doc);

        return new Promise(function(resolve, reject) {
            collection.save(json, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.cleanup());
                }
            });
        });
    },

    /**
     * Cleanup a document by removing all pending revions
     * @return {Document}
     */

    cleanup() {
        return this.merge({ revisions: new Stack() });
    }
};

module.exports = Document;
