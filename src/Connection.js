const Promise = require('q');
const { MongoClient } = require('mongodb');

class Connection {
    constructor(dbInfos) {
        // Infos to connect to the datavase
        this.infos = dbInfos;

        // Map of collection name -> Model
        this.models = {};

        this.db;
    }

    /**
     * Ensure that the connection is ready
     * @return {Promise}
     */

    ensure() {
        let that = this;
        let { infos } = this;

        if (this._connection) {
            return this._connection;
        }

        this._connection = Promise.nfcall(MongoClient.connect, infos)
            .then(function(db) {
                that.db = db;
            });

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
        let that = this;

        return this.ensure()
        .then(function() {
            let { db } = that;
            return db.collection(collection);
        });
    }
}

module.exports = Connection;
