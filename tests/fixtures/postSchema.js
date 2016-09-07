const { Schema, Type } = require('../../src');

module.exports = new Schema({
    user:  Type.Ref('User'),
    title: Type.String()
});
