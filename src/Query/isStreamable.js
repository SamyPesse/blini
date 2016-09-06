
/**
 * Test if a mquery is streamable or if it'll return an unique result.
 * @param {MQuery} query
 * @return {Boolean}
 */
function isStreamable(query) {
    return query.op !== 'findOne';
}

module.exports = isStreamable;
