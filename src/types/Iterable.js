const Type = require('./Type');

const DEFAULTS = {
    Iterable:  null,
    valueType: null
};

class TypeIterable extends Type(DEFAULTS) {
    constructor(Iterable, valueType, props) {
        super({
            Iterable,
            valueType,
            ...props
        });
    }

    toJS(value) {
        const { Iterable, valueType } = this;

        let list = new Iterable(value);
        list = list.map(x => valueType.toJS(x));

        return list;
    }

    toMongo(value) {
        const { valueType } = this;

        return value
            .map(x => valueType.toMongo(x))
            .toJS();
    }

}

module.exports = TypeIterable;
