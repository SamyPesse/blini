const { Record, List } = require('immutable');
const { ObjectID } = require('mongodb');
const MongoIndex = require('./MongoIndex');

const DEFAULTS = {
    // Transform data before being sent to mongo
    serialize:   (value => value),
    // Transform data from mongo
    deserialize: (value => value),
    // List of validation functions
    validations: new List(),
    // Definition for the index concerning this field
    index:       new MongoIndex()
};

/**
 * A type of data describe how data should be serialized to the database
 * and deserialized from it.
 */

class Type extends Record(DEFAULTS) {
    constructor(values) {
        values = values || {};
        values.index = new MongoIndex(values.index);

        super(values);
    }

    /**
     * Transform a value from Mongo.
     * @param {Mixed} value
     * @return {Mixed} result
     */

    toJS(value) {
        const { deserialize } = this;
        return deserialize(value);
    }

    /**
     * Transform a value to pure JSON for Mongo.
     * @param {Mixed} value
     * @return {JSON} json
     */

    toMongo(value) {
        const { serialize } = this;
        return serialize(value);
    }

    static Mixed(props) {
        return new Type(props);
    }

    /**
     * Native type for a string
     * @return {Type}
     */

    static String(props) {
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

    static Number(props) {
        return new Type({
            serialize:   Number,
            deserialize: Number,
            ...props
        });
    }

    /**
     * Native ObjectID for mongo
     * @return {Type}
     */

    static ObjectID(props) {
        return new Type({
            serialize:   ObjectID,
            deserialize: ObjectID,
            ...props
        });
    }

    /**
     * Lists are ordered indexed dense collections, much like a JavaScript Array.
     *
     * @param {Type} inner
     * @return {Type}
     */

    static List(inner, props) {
        function serialize(value) {
            return value
                .map(x => inner.toMongo(x))
                .toArray();
        }

        function deserialize(value) {
            let list = new List(value);
            list = list.map(x => inner.toJS(x));

            return list;
        }

        return new Type({
            serialize,
            deserialize,
            ...props
        });
    }
}

module.exports = Type;
