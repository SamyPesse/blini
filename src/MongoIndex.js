const {Record} = require('immutable');

const DEFAULTS = {
    unique: Boolean(true)
};

class Index extends Record(DEFAULTS) {

}

module.exports = Index;
