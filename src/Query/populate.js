const Promise = require('bluebird');
const { List, Record } = require('immutable');

const TypeRef = require('../types/Ref');
const fieldPath = require('../utils/fieldPath');


/**
 * Option for populating a field
 */
const PopulateField = Record({
    // Path of field to populate
    path: '',
    // Only select fields in th fetched documents (TODO)
    select: [],
    // Other criteria to use during fetch (TODO)
    match: {}
});

/**
 * Populate a specific value in a document.
 * @param {PopulateField} field
 * @param {String} keyPath
 * @param {Document} doc
 * @param {Type} type
 * @param {Object} cache
 * @return {Promise<Document>} doc
 */
function populateKeyPath(field, keyPath, doc, type, cache = {}) {
    const connection = doc.getConnection();
    const setPath = fieldPath.split(keyPath);
    const value = doc.getIn(setPath);

    if (!(type instanceof TypeRef)) {
        return Promise.reject(new Error('Cannot populate non-ref fields'));
    }

    // This reference has already been fetched
    if (cache[value]) {
        return doc.setIn(setPath, cache[value]);
    }

    // Fetch the reference
    return type.resolve(connection, value)
    .then(function(resolved) {
        cache[value] = resolved;
        return doc.setIn(setPath, resolved);
    });
}

/**
 * Populate a field by its key in a document.
 * @param {PopulateField} field
 * @param {Document} doc
 * @param {Object} cache
 * @return {Promise<Document>} doc
 */
function populateField(field, doc, cache = {}) {
    const schema = doc.getSchema();
    const type = schema.resolveFieldByKey(field.path);
    const keyPaths = schema.resolveFieldPath(doc, field.path);

    return Promise.reduce(keyPaths.toArray(), (newDoc, keyPath) => {
        return populateKeyPath(field, keyPath, newDoc, type, cache);
    }, doc);
}

/**
 * Populate a field in a list of documents.
 * @param {PopulateField} field
 * @param {List<Document>} docs
 * @param {Object} cache
 * @return {Promise<List<Document>>}
 */
function populateFieldForDocs(field, docs, cache = {}) {
    return Promise.reduce(docs, function(accu, doc) {
        return populateField(field, doc, cache)
        .then(function(newDoc) {
            return accu.concat([newDoc]);
        });
    }, [])
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
    // for now, options of populated fields are not used
    return Promise.reduce(fields, (newDocs, [ path, options]) => {
        const opt = PopulateField({
            ...options,
            path
        });

        return populateFieldForDocs(opt, newDocs, cache);
    }, docs);
}

module.exports = populate;
