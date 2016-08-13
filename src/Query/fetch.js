const Promise = require('q');

/**
 * Fetch documents for a mquery as a stream.
 * Dispatch a progress on promise for eaxh document.
 * This method does not return a list of the result.
 *
 * @param {Model} model
 * @param {MQuery} query
 * @return {Promise}
 */
function fetch(model, query) {
    let deferred = Promise.defer();

    // findOne doesn't support stream
    if (query.op === 'findOne') {
        query.exec(function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.notify(model.fromMongo(doc));
                deferred.resolve();
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
}

module.exports = fetch;
