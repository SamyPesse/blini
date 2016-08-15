const Promise = require('bluebird');
const { List } = require('immutable');

const TypeRef = require('../types/Ref');

/**
 * Populate a specific value in a document.
 * @param {String} keyPath
 * @param {Document} doc
 * @param {Type} type
 * @param {Object} cache
 * @return {Promise<Document>} doc
 */
function populateKeyPath(keyPath, doc, type, cache = {}) {
    const connection = doc.getConnection();
    const value = doc.getIn(keyPath);

    if (!(type instanceof TypeRef)) {
        return Promise.reject(new Error('Cannot populate non-ref fields'));
    }

    // This reference has already been fetched
    if (cache[value]) {
        return doc.setIn(keyPath, cache[value]);
    }

    // Fetch the reference
    return type.resolve(connection, value)
    .then(function(resolved) {
        cache[value] = resolved;
        return doc.setIn(keyPath, resolved);
    });
}

/**
 * Populate a field by its key in a document.
 * @param {String} field
 * @param {Document} doc
 * @param {Object} cache
 * @return {Promise<Document>} doc
 */
function populateField(field, doc, cache = {}) {
    const schema = doc.getSchema();
    const type = doc.resolveFieldByKey(field);
    const keyPaths = schema.resolveFieldInDoc(field, doc);

    return keyPaths.reduce(function(prev, keyPath) {
        return prev.then(newDoc => populateKeyPath(newDoc, keyPath, type, cache));
    }, Promise(doc));
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
