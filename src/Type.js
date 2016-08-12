const {Record, Set, List, Map} = require('immutable');

const DEFAULTS = {
    // Transform data before being sent to mongo
    serialize:   (value => value),

    // Transform data from mongo
    deserialize: (value => value),

    // List of validation functions
    validations: List()
};

/**
 * A type of data describe how data should be serialized to the database
 * and deserialized from it.
 */

class Type extends Record(DEFAULTS) {
    toJS(value) {
        const { deserialize } = this;
        return deserialize(value);
    }

    toMongo(value) {
        const { serialize } = this;
        return serialize(value);
    }
}

/**
 * Native type for a string
 * @return {Type}
 */
function TypeString(props) {
    return new Type({
        serialize:   String,
        deserialize: String,
        ...props
    });
}

/**
 * Native type for a string
 * @return {Type}
 */
function TypeNumber(props) {
    return new Type({
        serialize:   Number,
        deserialize: Number,
        ...props
    });
}

/**
 * Lists are ordered indexed dense collections, much like a JavaScript Array.
 *
 * @param {Type} inner
 * @return {Type}
 */
function TypeList(inner, props) {
    function serialize(value) {
        return value
            .map(x => inner.toMongo(x))
            .toArray();
    }

    function deserialize(value) {
        let list = new List(value);
        list = list.map(x => inner.toJS(x))

        return list;
    }

    return new Type({
        serialize,
        deserialize,
        ...props
    });
}

module.exports        = Type;
module.exports.String = TypeString;
module.exports.Number = TypeNumber;
module.exports.List   = TypeList;
