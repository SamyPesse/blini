const FIELD_SEPARATOR = '.';

/**
 * Join a field path
 * @param {String} base
 * @param {String} field
 * @return {String}
 */
function joinFields(base, field) {
    return base? [base, field].join(FIELD_SEPARATOR) : field;
}

module.exports = {
    SEPARATOR: FIELD_SEPARATOR,
    join:      joinFields
};
