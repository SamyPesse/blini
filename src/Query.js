const Promise = require('q');
const {Record, Map, List} = require('immutable');

const TYPES = {
    FIND: 'find',
    FINDONE: 'findOne'
};

const DEFAULTS = {
    // Model related to this query
    model:   null,
    // Type of query
    type:    TYPES.FIND,
    // Options
    options: new Map()
};

/**
 * Query constructor used for building MongoDB queries.
 */
class Query extends Record(DEFAULTS) {
    constructor(model) {
        super({
            model
        });
    }

    /**
     * Execute a query and returns its results
     * @return {Promise<List<Model>|Model>}
     */

    exec() {
        let accu = [];

        return this.fetch()
            .progress(function(doc) {
                accu.push(doc);
            })
            .then(function() {
                return new List(accu);
            });
    }

    /**
     * Fetch the result, dispatch a progress on promise for eaxh result.
     * This method does not return a list of the result.
     *
     * @return {Promise}
     */

    fetch() {
        const { model, type } = this;

        return model.getCollection()
            .then(function(col) {
                let deferred = Promise.defer();
                let cursor = col[type].call(col);

                cursor.each(function(err, doc) {
                    if (err) {
                        return deferred.reject(err);
                    }
                    if (!doc) {
                        deferred.resolve();
                    }

                    deferred.notify(model.fromMongo(doc));
                });

                return deferred.promise;
            });
    }

    /**
     * Append more filters
     * @return {Query} query
     */

    find(filter) {
        return this;
    }

    /**
     * Transform this query as a findOne query
     * @return {Query} query
     */

    findOne(filter) {
        return this
            .find(filter)
            .merge({
                type: TYPES.FINDONE
            });
    }

    /**
     * Limit the maximum count of results
     * @param {Number} n
     * @return {Query} query
     */

    limit(n) {
        // TODO
        return this;
    }

    /**
     * Skip n elements
     * @param {Number} n
     * @return {Query} query
     */

    skip(n) {
        // TODO
        return this;
    }
}

module.exports = Query;
