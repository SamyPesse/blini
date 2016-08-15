const map = require('map-stream');

/**
 * Fetch documents for a mquery as a stream.
 *
 * @param {Model} model
 * @param {MQuery} query
 * @return {Stream}
 */
function fetch(model, query) {
    return query.stream().pipe(
        map(function(doc, callback) {
            callback(null, model.fromMongo(doc));
        })
    );
}

module.exports = fetch;
