const Promise = require('q');
const mquery = require('mquery');
const {Record, List} = require('immutable');

const DEFAULTS = {
    // Model related to this query
    model:   null,
    // Type of query
    operations: List()
};

// List of methods
const METHODS = [
    'all',
    'and',
    'box',
    'circle',
    'comment',
    'distinct',
    'equals',
    'exists',
    'find',
    'findOne',
    'geometry',
    'gt',
    'gte',
    'hint',
    'in',
    'intersects',
    'limit',
    'lt',
    'lte',
    'maxDistance',
    'maxScan',
    'maxTime',
    'mod',
    'ne',
    'near',
    'nin',
    'nor',
    'or',
    'polygon',
    'read',
    'regex',
    'select',
    'setOptions',
    'size',
    'skip',
    'slaveOk',
    'slice',
    'snapshot',
    'sort',
    'tailable',
    'where',
    'within',
    'within'
];

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
            .then(function(doc) {
                if (doc) {
                    return doc;
                }
                
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
        const { model } = this;

        return this.toMquery()
            .then(function({query}) {
                let deferred = Promise.defer();

                // findOne doesn't support stream
                if (query.op === 'findOne') {
                    query.exec(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(model.fromMongo(doc));
                        }
                    });
                } else {
                    let stream = query.stream();

                    stream.on('data', function(doc) {
                        deferred.notify(model.fromMongo(doc));
                    });

                    stream.once('error', function(err) {
                        deferred.reject(err);
                    });

                    stream.once('end', function(err) {
                        deferred.resolve();
                    });
                }

                return deferred.promise;
            });
    }

    /**
     * Convert to a mquery instance
     * @return {Promise<mquery.Query>}
     */

    toMquery() {
        const { model, operations } = this;

        return model.getCollection()
            .then(function(collection) {
                const query = operations
                    .reduce(function(query, {method,args}) {
                        return query[method].apply(query, args);
                    }, mquery(collection));

                return { query };
            });
    }

    /**
     * Push a mquery call
     *
     * @param {String} method
     * @param {Arguments} args
     * @return {Query}
     */

    pushOp(method, args) {
        let { operations } = this;
        operations = operations.push({ method, args });

        return this.merge({
            operations
        });
    }
}

// Mix in `mquery` methods.
METHODS.forEach(function(method) {
    Query.prototype[method] = function(...args) {
        return this.pushOp(method, args);
    };
});

module.exports = Query;
