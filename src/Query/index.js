const mquery = require('mquery');
const Readable = require('stream').Readable;
const { Record, List, OrderedMap } = require('immutable');

const populate = require('./populate');
const populateOne = require('./populateOne');
const fetch = require('./fetch');
const isStreamable = require('./isStreamable');

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
                return new Promise(function(resolve, reject) {
                    let accu = [];

                    if (!isStreamable(query)) {
                        query.exec(function(err, doc) {
                            if (err) {
                                reject(err);
                            } else {
                                doc = model.fromMongo(doc);
                                resolve(populateOne(toPopulate, doc));
                            }
                        });

                        return;
                    }

                    fetch(model, query)
                    .on('data', function(doc) {
                        accu.push(doc);
                    })
                    .on('error', function(err) {
                        reject(err);
                    })
                    .on('end', function() {
                        if (query.op === 'findOne') {
                            resolve(accu[0]);
                        }

                        let results = new List(accu);
                        resolve(populate(toPopulate, results));
                    });
                });
            });
    }

    /**
     * Fetch the result as a stream.
     * TODO: populate documents on the fly.
     *
     * @return {Stream}
     */

    stream() {
        const { model } = this;
        const stream = new Readable();

        this.toMQuery()
            .then(function({query}) {
                if (!isStreamable(query)) {
                    throw new Error('This query is not streamable');
                }

                fetch(model, query).pipe(stream);
            })
            .fail(function(err) {
                stream.emit('error', err);
            });

        return stream;

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
