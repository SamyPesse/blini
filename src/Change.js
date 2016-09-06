const { Record } = require('immutable');

const TYPES = {
    SET:   '$set',
    UNSET: '$unset'
};

const DEFAULTS = {
    // Type of change
    type:  String(TYPES.UPDATE),
    // Path for the field
    path:  String(),
    // Value for set
    value: null
};

class Change extends Record(DEFAULTS) {

    /**
     * Return true if this change is apply on an array item.
     * @return {Boolean}
     */

    isInArray() {
        return this.path.search(/\.[0-9]+(\.|$)/) >= 0;
    }

    /**
     * Create a change of type SET
     * @param {String} path
     * @param {Mixed} value
     * @return {Change}
     */

    static set(path, value) {
        return new Change({
            type: TYPES.SET,
            path,
            value
        });
    }

    /**
     * Create a change of type SET
     * @param {String} path
     * @return {Change}
     */

    static unset(path) {
        return new Change({
            type: TYPES.UNSET,
            path
        });
    }


    /**
     * Convert a list of changes into a MongoDB update operations
     * @param {List<Change>} changes
     * @return {Object} query
     */

    static toMongo(changes) {
        return changes
            .groupBy(function(change) {
                return change.type;
            })
            .map(function(group) {
                return group
                    .map(change => [change.path, change.value])
                    .toMap();
            })
            .toJS();
    }

}

module.exports = Change;
module.exports.TYPES = TYPES;
