const { Record, Map } = require('immutable');

const Type = require('./Type');

const DEFAULTS = {
    fields: new Map()
};

class Schema extends Record(DEFAULTS) {
    constructor(fields) {
        super({
            fields: new Map(fields)
        });
    }
}

module.exports = Schema;
