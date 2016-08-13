const Query = require('./Query');

/**
 * Static methods for the document models.
 */

const DocumentStatics = {
    /**
     * Get an interface to work with the collection.
     * @return {Promise<MongoDB.Collection>} collection
     */

    getCollection() {
        const connection = this.connection;
        const name = this.collection;
        return connection.getCollection(name);
    },

    /**
     * Discriminate this model
     * @param {Object} filter
     * @param {Schema} schema
     * @return {Model}
     */

    discriminate(filter, schema) {

    },

    /**
     * Create a new document from a MongoDB document
     * @param {JSON} json
     * @return {Document} doc
     */

    fromMongo(json) {
        const schema = this.schema;
        const values = schema.toJS(json);

        return new this.prototype.constructor(values);
    },

    /**
     * Create a query for this model
     * @return {Query}
     */

    query() {
        return new Query(this);
    },

    find(filter) {
        return this.query().find(filter);
    },

    findOne(filter) {
        return this.query().findOne(filter);
    },

    findById(id) {
        return this.query().findOne({
            _id: id
        });
    },

    remove(filter) {
        return this.query().remove(filter);
    }
};

module.exports = DocumentStatics;
