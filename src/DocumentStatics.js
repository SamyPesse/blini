const Query = require('./Query');

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
     * Create a new document from a MongoDB document
     * @param {JSON} json
     * @return {Document} doc
     */

    fromMongo(json) {
        const schema = this.schema;
        const values = schema.toJS(json);

        return new this.Model(values);
    },

    /**
     * Create a query for this model
     * @return {Query}
     */

    query() {
        return new Query(this);
    },

    /**
     * Create a findOne query for this model
     * @return {Query}
     */

    findOne(filter) {
        return this.query().findOne(filter);
    }

};

module.exports = DocumentStatics;
