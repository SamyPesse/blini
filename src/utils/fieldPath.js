const FIELD_SEPARATOR = '.';
const ARRAY_SELECTOR = /\[(\d)+\]/;

/**
 * Join a field path
 * @param {String} ...part
 * @return {String}
 */
function joinFields(...parts) {
    return parts
        .map(String)
        .filter(part => Boolean(part))
        .reduce((result, part, i) => {
            if (part.match(ARRAY_SELECTOR) || i === 0) {
                return result + part;
            } else {
                return result + FIELD_SEPARATOR + part;
            }
        }, '');
}

/**
 * Split a field path
 * @param {String} fieldPath
 * @return {Array<String>}
 */
function splitFieldPath(fieldPath) {
    return fieldPath.split(FIELD_SEPARATOR);
}

module.exports = {
    SEPARATOR: FIELD_SEPARATOR,
    join:      joinFields,
    split:     splitFieldPath
};
