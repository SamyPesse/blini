
/**
 * Test if a mquery is returning something or not
 * @param {MQuery} query
 * @return {Boolean}
 */
function hasResults(query) {
    switch (query.op) {
    case 'find':
    case 'findOne':
        return true;
    default:
        return false;
    }
}

module.exports = hasResults;
