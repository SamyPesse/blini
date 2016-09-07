const Promise = require('bluebird');
const { MongoClient } = require('mongodb');

class Connection {
    constructor(dbInfos) {
        // Infos to connect to the datavase
        this.infos = dbInfos;

        // Map of collection name -> Model
        this.models = {};

        this.db = null;
    }

    /**
     * Ensure that the connection is ready
     * @return {Promise}
     */

    ensure() {
        const that = this;
        const { infos } = this;

        if (!this._connection) {
            this._connection = new Promise(function(resolve, reject) {
                MongoClient.connect(infos, function(err, db) {
                    if (err) {
                        reject(err);
                    } else {
                        that.db = db;
                        resolve();
                    }
                });
            });
        }

        return this._connection;
    }

    /**
     * Close and destroy this connection
     * @return {Promise}
     */

    close() {
        const { db } = this;

        if (db) {
            return Promise.reject(new Error('Connection is not established'));
        }

        return Promise.nfcall(db.close.bind(db));
    }

    /**
     * Return a setup collection
     *
     * @param {String} collection
     * @return {Promise<MongoDB.Collection>}
     */

    getCollection(collection) {
        const that = this;

        return this.ensure()
        .then(function() {
            const { db } = that;
            return db.collection(collection);
        });
    }

    /**
     * Setup a collection for a model:
     *  - Creates it if non existant
     *  - Create indexes
     *
     * @param {ModelConstructor} Model
     * @return {Promise}
     */

    setupCollectionFor(Model) {
        // const schema = Model.schema;
        // const indexes = schema.getIndexes();

        // TODO
    }
}

module.exports = Connection;
