const Promise = require('q');
const { List } = require('immutable');

/**
 * Iterate over all values matching a field key in a document
 * @param {Document} doc
 * @param {String} key
 * @param {Function} fn
 */
function iterFields(doc, key, fn) {

}

/**
 * Populate a field in a document
 * @param {String} field
 * @param {Document} doc
 * @param {Object} cache
 * @return {Promise<Document>} doc
 */
function populateField(field, doc, cache = {}) {

}

/**
 * Populate a field in a list of documents
 * @param {String} field
 * @param {List<Document>} docs
 * @param {Object} cache
 * @return {Promise<List<Document>>}
 */
function populateFieldForDocs(field, docs, cache = {}) {
    return docs.reduce(function(prev, doc) {
        return prev.then(function(accu) {
            return populateField(field, cache, doc)
            .then(function(newDoc) {
                return accu.concat([newDoc]);
            });
        });
    }, Promise([]))
    .then(List);
}

/**
 * Populate a list of documents.
 * We fetch all references that requires population.
 *
 * @param {Map<String:Object>} fields
 * @param {List} docs
 * @param {Object} cache
 * @return {Promise<List>} docs
 */
function populate(fields, docs, cache = {}) {
    return fields.reduce(function(prev, field) {
        return populateFieldForDocs(field, cache, docs);
    }, Promise(docs));
}

module.exports = populate;
