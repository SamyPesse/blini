const mquery = require('mquery');
const { Record, List, OrderedMap } = require('immutable');

const populate = require('./populate');
const fetch = require('./fetch');

const DEFAULTS = {
    // Model related to this query
    model:      null,
    // Type of query
    operations: List(),
    // List of fields to populate
    toPopulate: OrderedMap()
};

// List of methods
const METHODS = [
    'all', 'and', 'box', 'circle', 'comment', 'distinct', 'equals',
    'exists', 'find', 'findOne', 'geometry', 'gt', 'gte', 'hint',
    'in', 'intersects', 'limit', 'lt', 'lte', 'maxDistance', 'maxScan',
    'maxTime', 'mod', 'ne', 'near', 'nin', 'nor', 'or', 'polygon', 'read',
    'regex', 'remove', 'select', 'setOptions', 'size', 'skip', 'slaveOk', 'slice',
    'snapshot', 'sort', 'tailable', 'where', 'within'
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
     * Mark a field for post query population.
     * @param {String} field
     * @param {Object} options
     * @return {Query} query
     */

    populate(field, options = {}) {
        let { toPopulate } = this;

        toPopulate = toPopulate.set(field, options);

        return this.merge({
            toPopulate
        });
    }

    /**
     * Execute a query and returns its results
     * @return {Promise<List<Document>|Document>}
     */

    exec() {
        const { model, toPopulate } = this;

        return this.toMQuery()
            .then(function({query}) {
                let accu = [];

                return fetch(model, query)

                // Accumulate documents
                .progress(function(doc) {
                    accu.push(doc);
                })

                // Populate all results
                .then(function() {
                    return populate(toPopulate, accu);
                })

                .then(function(results) {
                    if (query.op === 'findOne') {
                        return results[0];
                    }

                    return new List(results);
                });
            });
    }

    /**
     * Fetch the result as a stream.
     * TODO: populate documents on the fly.
     *
     * @return {Promise}
     */

    fetch() {
        const { model } = this;

        return this.toMQuery()
            .then(function({query}) {
                return fetch(model, query);
            });
    }

    /**
     * Convert to a mquery instance
     * @return {Promise<mquery.Query>}
     */

    toMQuery() {
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
