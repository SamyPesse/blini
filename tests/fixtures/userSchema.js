const { Schema, Type, Index } = require('../../src');

module.exports = new Schema({
    username: Type.String({ index: Index.Unique() }),
    name:     Type.String()
});
