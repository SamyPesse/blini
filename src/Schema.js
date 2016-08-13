const Type = require('./Type');

class Schema extends Type {
    constructor(fields) {
        function serialize(doc) {
            return fields
                .map(function(type, key) {
                    let value = doc.get(key);
                    return type.toMongo(value);
                })
                .toJS();
        }

        function deserialize(json) {
            return fields
                .map(function(type, key) {
                    let value = json[key];
                    return type.toJS(value);
                })
                .toJS();
        }

        super({
            serialize,
            deserialize,
            ...fields
        });
    }
}

module.exports = Schema;
