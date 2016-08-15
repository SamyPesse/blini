
/**
 * Test if a mquery is streamable or if it returns an unique result.
 * @param {MQuery} query
 * @return {Boolean}
 */
function isStreamable(query) {
    return query.op !== 'findOne';
}


module.exports = isStreamable;
