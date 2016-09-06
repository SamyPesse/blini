const mapStream = require('map-stream');

/**
 * Fetch all document results for a mquery, and returns a stream of it.
 *
 * @param {Model} model
 * @param {MQuery} query
 * @return {Stream}
 */
function fetch(model, query) {
    return query.stream().pipe(
        mapStream(function(doc, callback) {
            callback(null, model.fromMongo(doc));
        })
    );
}

module.exports = fetch;
