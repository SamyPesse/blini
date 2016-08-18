const { List } = require('immutable');
const populate = require('./populate');

/**
 * Populate one document
 * @param  {Map} fields
 * @param  {Document} doc
 * @param  {Object} cache
 * @return {Promise<Document>} doc
 */
function populateOne(fields, doc, cache) {
    return populate(fields, List([doc]), cache)
    .then(function(docs) {
        return docs.get(0);
    });
}

module.exports = populateOne;
