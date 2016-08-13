const { Schema, Type } = require('../../src');

module.exports = new Schema({
    username: Type.String(),
    name:     Type.String()
});
