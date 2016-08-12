const { MongoClient } = require('mongodb');

class Connection {
    constructor(dbInfos) {
        this.infos = dbInfos;
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

        return this._connection;
    }

    /**
     * Close and destroy this connection
     * @return {Promise}
     */

    close() {
        let that = this;

        return new Promise(function(resolve, reject) {
            if (that.db) {
                reject(new Error('Connection is not established'));
            }

            that.db.close(function() {
                resolve();
            });
        });
    }
}

module.exports = Connection;
