const Promise = require('bluebird');
const {Record} = require('immutable');

const DEFAULTS = {
    // The name of the index
    name:       String(),
    // Creates a unique index so that the collection will not accept insertion
    // of documents where the index key or keys match an existing value in the index.
    unique:     Boolean(true),
    // Builds the index in the background so that building
    // an index does not block other database activities.
    background: Boolean(false),
    //  If true, the index only references documents with the specified field.
    sparse:     Boolean(false),
    // Order of the index
    ascending:  Boolean(true)
};

class Index extends Record(DEFAULTS) {

    /**
     * Ensure the index is created
     * @param {MongoDB.Collection} collection
     * @param {String} field
     * @return {Promise}
     */

    ensure(collection, field) {
        const options = this.toMongoOptions();

        return Promise.nfcall(
            collection.createIndex.bind(collection),
            {
                [field]: this.ascending ? 1 : -1
            },
            options
        );
    }

    /**
     * Return values for MongoDB createIndex options
     * @return {Object} options
     */

    toMongoOptions() {
        const options = this.toJS();
        delete options.ascending;

        return options;
    }

    /**
     * Create an unique index
     * @param {Object} props
     * @return {Index}
     */

    static Unique(props) {
        return new Index({
            unique: true,
            ...props
        });
    }
}

module.exports = Index;
