const Type = require('./Type');

const DEFAULTS = {
    Iterable: null,
    type: null
};

class TypeIterable extends Type(DEFAULTS) {
    constructor(Iterable, type, props) {
        super({
            Iterable,
            type,
            ...props
        });
    }

    toJS(value) {
        const { Iterable, type } = this;

        let list = new Iterable(value);
        list = list.map(x => type.toJS(x));

        return list;
    }

    toMongo(value) {
        const { type } = this;

        return value
            .map(x => type.toMongo(x))
            .toJS();
    }

}

module.exports = TypeIterable;
