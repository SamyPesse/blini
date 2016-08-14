const Promise = require('q');

/**
 * Iterate over all values matching a field key in a document
 * @param {Document} doc
 * @param {String} key
 * @param {Function} fn
 */
function iterFields(doc, key, fn) {
    
}

/**
 * Populate a list of documents.
 * We fetch all references that requires population.
 *
 * @param {Map<String:Object>} fields
 * @param {List} docs
 * @return {Promise<List>} docs
 */
function populate(fields, docs) {
    // Cache of fetched references
    // const cache = {};

    // TODO


    return Promise(docs);
}

module.exports = populate;
